# Jif-u-Can

A clone of Imgur, an image/gif hosting site, that lets users look thru a variety of posts, make their own posts and comments for posts, and like and favorite posts of their choosing.


## Live Link

[https://jif-u-can.onrender.com/](https://jif-u-can.onrender.com/)

## Tech Stack

**Frontend:** HTML5, CSS3, React, Redux

**Backend:** python, SQL, SQLAlchemy, Flask


## Features

### Posts
- Users can see all posts on the landing page and all their posts on their user profile page
- Users can see a posts details on the respective post's page
- Users can make a new post via the navbar button
- Users can edit or delete their post on the respecive post's page

### Comments
- Users can see all comments on a respective post's page or all the current users comments on their user profile page
- Users can make new comments on a respective post's page
- Users can edit/delete any comments they've made on a post

### Likes
- Users can see all the likes a post has on both the landing page/individual post page
- Users can make a like or dislike and also remove the like/dislike if the user has made one on the landing page/individual post page

### Favorites
- Users can see all the posts they've fav'd on their user profile page
- Users can fav/unfav on the individual post page

## Preview Images

### Spots Landing Page

![](https://i.imgur.com/jU5gv2M.jpeg)

### Spots Details Page

![](https://i.imgur.com/1lxJZRh.png)
## Roadmap

-fdf

## Endpoints

|Request|Purpose|Result|
| ---- | ------------- | ---- |
| GET /api/auth/ | Authenticates a user | |
| POST /api/auth/login | Logs in a current user with valid credentials and returns the current user's information. |  |
| GET /api/auth/logout | Logs a user out |  |
| GET /api/auth/signup | Creates a new user and logs them in |  |
| GET /api/users/ | Gets info of all users |  |
| GET /api/users/:id | Gets info of user by id |  |
| GET /api/posts | Gets info of all posts and its comments |  |
| GET /api/posts/:id/likes | Get all likes for a post by id |  |
| POST /api/posts/new | Create a new post |  |
| PATCH /api/posts/:id | Edits an existing post |  |
| DELETE /api/posts/:id | Deletes an existing post |  |
| POST /api/comments/new | Create a new comment for a post |  |
| PATCH /api/comments/:id | Edits an existing comment |  |
| DELETE /api/comments/:id | Deletes an existing comment |  |
| GET /api/tags | Gets info of all the tags |  |
| POST /api/likes/new | Creates a new like by the current user on a specific post |  |
| DELETE /api/likes/:id | Deletes a like by the current user on a specific post |  |
| GET /api/favorites/current | Gets all current user favorites |  |
| POST /api/favorites/new | Adds the post to current users favorites |  |
| DELETE /api/favorites/:id | Deletes the favorite of the specific post |  |


your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
