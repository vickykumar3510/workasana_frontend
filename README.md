# Workasana

A full-stack task management and team collaboration tool/app where users can create projects, assign tasks to teams and owners, set deadlines, and organize work using tags. It supports authentication, dynamic filtering, URL-based queries, and reporting features to track task progress and team productivity.

## Demo Link
[Live Demo](https://workasana-tool.vercel.app/)

## Quick Start

```
git clone "https://github.com/vickykumar3510/workasana_frontend.git"
cd <workasana_frontend.git>
npm install
npm run dev
```

## Technologies
 * React JS
 * React Router
 * Node.js
 * Express
 * MongoDB
 * JWT

## Demo Video
Watch a walkthrough of all the major features of this app: [Google Drive Link](https://drive.google.com/drive/folders/1Rw7wRkIZIlKVVbajEUWaKlG_HoL8DEIa?usp=sharing)

## Features

**Dashboard**
- Display list of projects and task
- Add Project and Add task button available
- Taks's filter button available
- Sidebar for navigate all the pages

**Project**
- Display list of all projects with description and created date
- Add Project button available
- Filter by owner dropdown available

**Team**
- Display list of all teams
- Add new team button available

**Report**
- Total Work Done Last Week, Total Days of Work Pending, Tasks Closed by Team, Tasks Closed by Owner these four auto update reports available

**Setting**
- Display list of Tasks, Teams, Projects and Owners are available
- Delete button added with Tasks, Teams, Projects

**Project Management**
- Display list of all tasks in a project with status, owners, tags, and due date
- Add new Task button available
- Dropdown filter by owners and tag are avilable
- Sort by Due Date and Priority buttons are available

**Task Details**
- Display all details of selected task
- Mark as Completed button available to update the Status

**New Project Form**
- A form with Name and Description text available for create a new project

**New Task Form**
- A form with Project, Task Name, Team, Owners, Tags, Due Date, Time(in Days), Status, and option to add new tag avilable for create a new task

**New Team Form**
- A form with Name and Description text available for create a new team


## API Reference

**GET/api/tasks**<br>
List of tasks<br> 

Sample Response:
```
[{ _id, name, project, team, owners, tags, timeToComplete, status, createdAt, updatedAt, __v }]
```


**GET/api/teams**<br>
List of teams<br> 

Sample Response:
```
[{ _id, name, description, __v }]
```


**GET/api/projects**<br>
List of Projects<br> 

Sample Response:
```
[{ _id, name, description, createdAt, __v }]
```

**GET/api/auth/me**<br>
To authenticate user details<br> 

Sample Response:
```
[{ user: { _id, name, email } }]
```

**GET/api/users**<br> 
List of users<br>

Sample Response:
```
[{ _id, name, email, __v }]
```

**GET/api/tags**<br> 
List of tags<br>

Sample Response:
```
[{ _id, name, __v }]
```

**GET/api/reports/work-done-last-week**<br> 
Number of work done last week<br>

Sample Response:
```
[{ totalWorkDoneLastWeek }]
```

**GET/api/reports/pending-work-days**<br> 
Total days of work pending<br>

Sample Response:
```
[{ pendingWorkDays }]
```

**GET/api/reports/tasks-closed-by-team**<br> 
Number of tasks closed by team and team name<br>

Sample Response:
```
[{ closedTasks, teamName }]
```

**GET/api/reports/tasks-closed-by-owner**<br>
Number of task closed by owner and owner name<br>

Sample Response:
```
[{ closedTasks, ownerName }]
```

**POST/api/tasks**<br>
For add new Task<br>

Sample Response:
```
[{ _id, name, project, team, owners, tags, timeToComplete, status, createdAt, updatedAt, __v }]
```

**POST/api/teams**<br> 
For add new Team<br>

Sample Response:
```
[{ _id, name, description, __v }]
```

**POST/api/projects**<br> 
To add new Project<br>

Sample Response:
```
[{ _id, name, description, createdAt, __v }]
```

**POST/api/tags**<br>
To add new tags<br>

Sample Response:
```
[{ _id, name, __v }]
```

**POST/api/auth/signup**<br>
For adding new user/owner<br>

Sample Response:
```
[{ message }]
```

**POST/api/auth/login**<br>
Auth route for login<br>

Sample Response:
```
[{ message, token }]
```

**DELETE/api/projects/:id**<br>
For delete project by id<br>

Sample Response:
```
[{ message }]
```

**DELETE/api/teams/:id**<br>
For delete team by id<br>

Sample Response:
```
[{ message }]
```

**DELETE/api/tasks/:id**<br>
For delete task by id<br>

Sample Response:
```
[{ message }]
```

**PUT/api/tasks/:id**<br>
For update a task by id<br>

Sample Response:
```
[{ _id, name, project, team, owners, tags, timeToComplete, status, createdAt, updatedAt, __v }]
```


## Contact
For bugs or feature requests, please reach out to vicky.kumar3510@gmail.com