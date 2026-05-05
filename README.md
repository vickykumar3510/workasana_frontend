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
 * bcryptjs 

## Demo Video
Watch a walkthrough of all the major features of this app: [Google Drive Link](https://drive.google.com/drive/folders/1Rw7wRkIZIlKVVbajEUWaKlG_HoL8DEIa?usp=sharing)

## Features

**Login**
- User login box provided
- Credentials validated with backend API
- Incorrect password alerts shown
- Successful login redirects to dashboard
- Sign‑up option available

**Sign Up**
- User account creation form provided
- Credentials submitted to backend API
- Success alert shown on account creation
- Input validation (disabled button until all fields filled)
- Navigation link back to Sign‑In page

**Dashboard**
- Displays list of projects with navigation to project details
- Option to add new tasks and new project
- Shows user tasks with owners, status, and tags
- Task filtering by status (All, In Progress, Completed)
- Sidebar navigation with logout functionality included in all the pages

**Project**
- Displays list of all projects with name, description, and creation date
- Navigation to individual project management pages
- Option to add a new project
- Filter projects by owner using dropdown selection

**Team**
- Displays list of all teams
- Option to add new team

**Report**
- Displays summary metrics (work done last week, pending work days)
- Bar chart of tasks closed by team
- Pie chart of tasks closed by owner
- Snapshot of throughput and outstanding effort

**Setting**
- Manage and delete tasks
- Manage and delete teams
- Manage and delete projects (with confirmation, deletes related tasks too)
- View list of owners

**Project Management**
- Displays tasks for a selected project
- Filter tasks by owner and tag
- Sort tasks by due date or priority
- Shows task details (owners, tags, status, due date)

**Task Details**
- Displays full details of a selected task (name, team, owners, tags, due date)
- Shows task status with badge (Active / Completed)
- Calculates and displays due date and remaining days
- Option to mark task as completed with toast notification

**New Project Form**
- Form to create a new project
- Validates required fields before submission
- Success notification shown on project creation
- Redirects to All Projects page after submission

**New Task Form**
- Form to create a new task
- Assigns task to a project via dropdown
- Multi‑select for owners and tags
- Option to add new tags dynamically
- Auto‑calculation of time to complete (days) from due date
- Validates required fields before submission
- Success notification shown on task creation

**New Team Form**
- Form to create a new team
- Validates required fields before submission
- Success notification shown on team creation
- Redirects to Team Management page after submission

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