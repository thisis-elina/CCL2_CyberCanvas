# CCL2_CyberCanvas

This is my Creative Code Lab 02 Project.

# What is CyberCanvas?
This is a small project done as part of the requirements for completion of the second semester in the study course Bachelor of Science in Engineering (BSc) in Creative Computing and is in its core a first full-fledged attempt in making a multi-user website. This project has purely educational purposes and elements in the assets folder have not been created by me, neither they belong to me and have been used as placeholders for educational purposes. In future, if I will plan to expand and improve on the project, they would be removed and replaced.

Promotional Description of the Cyber Canvas concept:
>CyberCanvas is an online discussion forum that serves as a thriving hub for digital artists and designers. Fuelled by the ever-evolving landscape of technology and inspired by futuristic aesthetic, CyberCanvas is a platform where visionaries from around the globe converge to explore, collaborate, and push the boundaries of digital art and design.
> 
>Through engaging discussions, thought-provoking threads, and a vibrant community, CyberCanvas cultivates an environment where creativity flourishes. Whether it's sharing innovative techniques, discussing the latest industry trends, or seeking feedback on works-in-progress, this forum provides a space for artists and designers to exchange ideas and inspire one another.

# Used Tools

The following Technology was used to create this project.
- [NodeJs](https://nodejs.org/en)
    - [Express](https://expressjs.com)
- [Vite](https://vitejs.dev)
- [Vue](https://vuejs.org)
    - [Tailwindcss](https://tailwindcss.com)
    - [DaisyUI](https://daisyui.com)
- [MySQL](https://www.mysql.com/en/)

# Deployment
The following section will describe how to deploy the project (!) locally (!).

## Database
Deploy the MySQL database. Use the provided [ElinasDatabase.sql](ElinasDatabase.sql) file. It has been filled with dummy users, posts and replies, so you might already start working with something.

## Server
Go to server directory.
```bash
cd server
```

Make .env file in the root of the CCL server directory. Place the following information there. Replace information withing () with your actual information. Remove the brackets.
```makefile
DB_HOST=(YOUR.ACTUAL.HOST)
DB_PORT=(YOUR.ACTUAL.PORT)
DB_USERNAME=(YOUR.ACTUAL.USERNAME)
DB_PASSWORD=(YOUR.ACTUAL.PASSWORD)
DB_DATABASE=(YOUR.ACTUAL.DATABASE_NAME)
ACCESS_TOKEN_SECRET=(YOUR.ACTUAL.GENERATED.ACCES.TOKEN)
```
Run following commands one after another:
```bash
npm install
```
```bash
npm run dev
```
Server should be running now and database connected.

## Client
Go to client directory.
```bash
cd client
```
Run following commands one after another:
```bash
npm install
```
```bash
npm run dev
```
Client should be running now.

## Contact Me
You can always contact me by writting to cc221001@fhstp.ac.at

All the best!