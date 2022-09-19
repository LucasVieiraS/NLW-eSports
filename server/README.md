# Back-end
Handles getting game information and ads for the application.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)<br>
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
 ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


### Entities:

```/games```

>- id<br>
>- title<br>
>- bannerUrl<br>

```/ads```

>- id<br>
>- gameId<br>
>- name<br>
>- yearsPlaying<br>
>- discord<br>
>- weekDays<br>
>- hourStart<br>
>- hourEnd<br>
>- useVoiceChannel<br>
>- createdAt<br>

### Use Case

- Listing games with ad count;
- Creating new ads;
- Listing new ads per game;
- Search Discord by ad ID;
