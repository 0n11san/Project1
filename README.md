# Group Project 1

update! now hosted on CNAME (custom URL): www.kairns.rocks

https://0n11san.github.io/Project1/

## Name: Trail Marker
possible alts: 
- Kairns (little stacked rocks as logo)
- Mountain GOAT

## Description
## MVP (Minimally Viable Product)
- Hiking App. Presents the user w/ a search box that ask their zip code. Performs a search for trails (extra: within a certain radius of that zip). Site returns several trails within that zip. 

## Added Bonuses
- If user selects trail, they can add comments, make a profile, give rating (all stored in Firebase).
- About the team page (footer);
- Provides weather data

## UI Mockup
![alt text](https://github.com/0n11san/Project1/blob/master/assets/images/UI_Mockup.jpg)

- look/feel: (single page app) maybe something like Airbnb / backpacker.com (clean interface w/ big picture) name of app; single search  (location of where you are / want to go); radius; jump down

## Architecture
![alt text](https://github.com/0n11san/Project1/blob/master/assets/images/Architecture.jpg)

## APIs to be Used

- Trail API / Mashape; 
- Google Maps; 
- Open Weather;

## Team Members

- Hillary
- Jen
- Soraia
- Luis
- Jon

Picture goes here
__________________

## Rough Breakdown of Tasks
-user enters either his/her zip or full street address in the provided search box;
-he/she may also optionally select one of 3 radii ragnes (25 - 100 miles) via radio button to limit the subsequent search;
-he/she either presses enter key or clicks search button;
-this jumps the user further down the DOM into a results div;
-the function queries the Google Maps API to return latitude and longitude coordinates for the submitted address;
-said coordinates are then passed into the Hiking Project API, which then produces an object full of any trails that may fall in the default/desired radius area;
-the app then appends a list of each of these trails to the DOM alongside relevant info available in the aforementioned APIs (e.g. location map; trail conditions; etc)
-each result can be expanded for information
-if users select a particular result, they can leave comments / reviews, which will be stored in a Firebase DB for future users to see;

## Team Roles
Merge (Code Review) / Branch Master Enforcer : Jen;
(making sure code works; semicolons missing; etc)

GitHub Issue Enforcer : Luis
(makes sure everyone is creating issues for things they're working on; and that issues are being assigned)

Project Board Enforcer : Jon
(makes sure issues are being moved)

## Notes
-(move every issue into one of these "columns"):
    -to do
    -in progress
    -code review
    -done (merged)


## Requirements
- Must uses at least two APIs
- Must use AJAX to pull data
- Must utilize at least one new library or technology that we haven’t discussed
- Must have a polished frontend / UI
- Must meet good quality coding standards (indentation, scoping, naming)
- Must NOT use alerts, confirms, or prompts (look into modals!)
- Must have some sort of repeating element (table, columns, etc)
- Must use Bootstrap or Alternative CSS Framework (e.g. Materialize)
- Must be Deployed (GitHub Pages or Firebase)
- Must have User Input Validation
- Presentation Date: Two Weeks from Today


ADDITIONAL
- Utilize firebase (persistent data storage) consider this basically a requirement;
users can leave reviews 1-5 stars;
- Mobile responsiveness
-code MUST be shared via Github & Pull requests
-use Github project boards
-at beginning of each class, each group has a standup meeting (think Agile development & sprints):
    -what did u do yesterday?; what about today?; do you have any blockers?
