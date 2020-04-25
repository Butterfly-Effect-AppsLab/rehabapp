## Backend init
Our API is running in docker container, it has also a separate container for postgreSQL database.
Steps to init API after pull from origin:
 1. Make sure you have Docker installed on your machine. If not, follow this guide:  
 https://docs.docker.com/
 2. Open terminal and navigate to folder /backend
 3. Start docker-machine (skip this step if your machine is already started)  
 `docker-machine start`
 4. Build and deploy API   
 `docker-compose up`
 5. API is running on http://localhost:8000 
 
 If you're using Docker Toolbox on Windows:
 1. Your project has to be inside C:/Users due to mounting, or setup new shared folder following this article:  
 https://headsigned.com/posts/mounting-docker-volumes-with-docker-toolbox-for-windows/
 2. API is running on localhost inside your virtual machine, so you will have to find its IP:  
  `docker-machine ip default`  
  Or try some of these :wink: :  
  http://192.168.99.100:8000/  
  http://192.168.99.101:8000/  
  http://192.168.99.102:8000/  
  
 For creating and applying alembic migrations run:  
 `docker exec -it api_container sh -c "alembic revision -m \"MIGRATION_NAME_HERE\""`  
 `docker exec -it api_container sh -c "alembic upgrade head"`  