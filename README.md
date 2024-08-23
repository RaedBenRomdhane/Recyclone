***Recyclone***
Recyclone is an innovative web application that leverages artificial intelligence to analyze images of recyclable waste.The application identifies various objects present in the waste and provides useful information and statistics on how to recycle each item.

**Features**
-AI-Powered Analysis: Utilizes OpenAI's GPT-4 to accurately identify recyclable items and provide detailed recycling information.
-User-Friendly Interface: Designed to be intuitive and easy to use.
-Server-Side Pricing Tracker: On the server side, an Excel file is continuously updated to store the quota of each request sent to the OpenAI server during each processing, and keeps track of how much this app is spending on API requests in total.

**Notes**
-AI Model: This app is powered by OpenAI's GPT-4.
-Database: The app is designed to connect to a MongoDB database named Waste_Sorting with two collections:
    History: Stores the OpenAI responses with all the corresponding data.
    Admins: Contains the usernames and passwords of every admin so they can connect to the app as admins and check the response history.
    Deployment: Note that some URLs and configurations need to be adapted to the server where this app will be deployed.

**Usage**
1-Upload an image of the waste you want to analyze.
2-The app will identify the objects in the image and provide recycling information and statistics.
3-Admins can log in to review the response history.

**Demonstration video link:**
https://www.linkedin.com/posts/raed-ben-romdhane-aa9149291_pr%C3%A9sentation-de-recyclone-r%C3%A9volutionner-activity-7224392285868695553-4RIC?utm_source=share&utm_medium=member_desktop
