#this is the image we are using to create the container
FROM node 
#exclude node.modules from the container
WORKDIR /app 
#this is the directory where we are going to put our files
COPY package.json ./  
#we copy the package.json file first so there isn't a conflict with the node_modules directory
RUN npm install 
# this is the command to install node_modules
COPY . ./ 

CMD npm start
#this is the command to start the container

