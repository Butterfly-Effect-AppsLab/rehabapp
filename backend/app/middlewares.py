import jwt
from falcon import HTTPUnauthorized
from jwt import InvalidTokenError, DecodeError, InvalidSignatureError, ExpiredSignatureError

from config import KEY
from models import Session, User


class CORSMiddleware(object):
    def process_response(self, req, resp, resource, req_succeeded):
        resp.set_header('Access-Control-Allow-Origin', '*')

        if (req_succeeded
                and req.method == 'OPTIONS'
                and req.get_header('Access-Control-Request-Method')
        ):
            # NOTE(kgriffs): This is a CORS preflight request. Patch the
            #   response accordingly.

            allow = resp.get_header('Allow')
            resp.delete_header('Allow')

            allow_headers = req.get_header(
                'Access-Control-Request-Headers',
                default='*'
            )

            resp.set_headers((
                ('Access-Control-Allow-Methods', allow),
                ('Access-Control-Allow-Headers', allow_headers),
                ('Access-Control-Max-Age', '86400'),  # 24 hours
            ))


class SessionMiddleware(object):
    def process_request(self, req, resp):
        """Process the request before routing it.

        Note:
            Because Falcon routes each request based on req.path, a
            request can be effectively re-routed by setting that
            attribute to a new value from within process_request().

        Args:
            req: Request object that will eventually be
                routed to an on_* responder method.
            resp: Response object that will be routed to
                the on_* responder.
        """

        # if req.path.split("/")[1] == "test":
        #     req.path = req.path.replace("test/", "")
        #     req.context.test = True
        # else:
        req.context.test = False

    def process_resource(self, req, resp, resource, params):
        """Process the request after routing.

        Note:
            This method is only called when the request matches
            a route to a resource.

        Args:
            req: Request object that will be passed to the
                routed responder.
            resp: Response object that will be passed to the
                responder.
            resource: Resource object to which the request was
                routed.
            params: A dict-like object representing any additional
                params derived from the route's URI template fields,
                that will be passed to the resource's responder
                method as keyword arguments.
        """
        req.context.session = Session()

    def process_response(self, req, resp, resource, req_succeeded):
        """Post-processing of the response (after routing).

        Args:
            req: Request object.
            resp: Response object.
            resource: Resource object to which the request was
                routed. May be None if no route was found
                for the request.
            req_succeeded: True if no exceptions were raised while
                the framework processed and routed the request;
                otherwise False.
        """

        if hasattr(req.context, 'session'):
            if not req.context.test:
                try:
                    req.context.session.commit()
                finally:
                    req.context.session.close()
            req.context.session.close()


class AuthMiddleware(object):

    def __init__(self, exclude_paths=None):
        if exclude_paths is None:
            exclude_paths = []
        self.exclude_paths = exclude_paths

    def require_auth(self, path):
        if path.split("/")[1] in self.exclude_paths:
            return False
        return True

    def authenticate(self, req):
        if not req.auth:
            raise HTTPUnauthorized(description="No token")
        token = req.auth.split(" ")[1]
        try:
            payload = jwt.decode(token, KEY, algorithm='HS256')
        except ExpiredSignatureError:
            raise HTTPUnauthorized(description="Token has expired")
        except (InvalidSignatureError, DecodeError, InvalidTokenError):
            raise HTTPUnauthorized(description="Wrong token")

        session = req.context.session

        user = session.query(User).filter(User.email == payload['email']).first()

        if not user:
            raise HTTPUnauthorized(description="Wrong token")

        return user

    def process_resource(self, req, resp, resource, params):
        """Process the request after routing.

        Note:
            This method is only called when the request matches
            a route to a resource.

        Args:
            req: Request object that will be passed to the
                routed responder.
            resp: Response object that will be passed to the
                responder.
            resource: Resource object to which the request was
                routed.
            params: A dict-like object representing any additional
                params derived from the route's URI template fields,
                that will be passed to the resource's responder
                method as keyword arguments.
        """

        if self.require_auth(req.path):
            req.context.user = self.authenticate(req)

