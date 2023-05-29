# Fitpal Tracking Web Application

## Table of Contents

- [Introduction](#introduction)
- [Development Process](#development-process)
    - [Planning](#planning)
    - [Design](#design)
    - [Development](#development)
- [Application Configuration](#application-configuration)
- [Recommendations for Future Development](#recommendations-for-future-development)


## Introduction

This documentation provides an in-depth overview of the web application's development process, configuration, deployment procedures, and guidance for future developers to extend this project. 

## Development Process

The development process includes planning, design, development, testing, deployment, and maintenance.

### Planning 

This stage involved brainstorming the features, functionalities, and user experiences I wanted the application to offer. I used **agile methodologies** for project management.

### Design 

In the design phase, I focused on creating UI/UX wireframes and application flowcharts. I used **Figma** to design and iterate the interface.

### Development 

I implemented the design using a combination of **HTML**, **CSS**, and **JavaScript** for the frontend, and **Node.js** on the backend.

In HTML, The <!DOCTYPE html> declaration helps with browser compatibility. It's a way to tell the browser what version of the HTML the document is written in.

<html lang="en"> is the root element of an HTML page and lang="en" declares that the language of this page is English.

The <head> section includes meta-information about the webpage like the character set, viewport, title, and links to CSS files. In this case, you're linking three CSS files. Two of these files seem to be SCSS files, which will need to be compiled to CSS before the browser can understand them.

The <body> section includes the content that will be displayed in the browser. In this case, it contains a fairly complex structure of divs, forms, and inputs. There seems to be a form for a calorie calculator, a results display, a calendar, a goal display, and an option to add to a day list.

Towards the end of the body section, a JavaScript file script.js is included. This script will likely contain the functionality for your page, including handling the form submission and interacting with the DOM.

There are a few places where inline JavaScript is used for handling events like onclick, which changes the display style of a specific element, and onchange, which calls a function when the selected option of a dropdown changes.

In Javascript,The $ function is a shorthand for document.querySelector(), which is a method that takes a string as an argument, in this case id, and returns the first Element within the document that matches the specified selector, or group of selectors. The selectors are the names of CSS classes or ids.

The hide and show functions are utilities to hide and show DOM elements, respectively.

The variable CalorieData is an object that stores data related to a user's daily calorie intake and goals.

The script attempts to load a previously saved CalorieData object from localStorage. If the saved data exists, it replaces the default CalorieData object.

The script then attaches event listeners to various DOM elements. These event listeners define what happens when a user clicks on these elements (buttons, areas in the application). For example, the event listener attached to the #calculateId element calculates and displays calorie intake for weight loss, weight maintenance, and weight gain based on the user's age, height, weight, gender, and activity level when the corresponding button is clicked.

The function changeType is responsible for displaying the correct section of the user interface based on the type of meal, activity, or BMR selected by the user.

The getNow and getMonth functions return the current date and the current month, respectively.

The render function updates the user interface to reflect the current state of CalorieData. It does this by updating DOM elements with values from CalorieData, showing or hiding elements based on the state of CalorieData, and saving the current state of CalorieData to localStorage. This function is called after any operation that modifies CalorieData.

Finally, the render function is called at the end to initialize the application with the current state of CalorieData.

A simple Express.js server application in Node.js is implemented
It begins by importing the Express module, which is a web application framework for Node.js.

Then it creates an instance of an Express application and assigns it to the variable app.

The app.use(express.static('public')) line is middleware that serves static files. This means that any file in the public directory (like HTML, CSS, and JavaScript files) can be accessed by a client. For instance, if there is an image.jpg in the public folder, it would be accessible at http://localhost:8888/image.jpg.

Then, it defines a route handler for GET requests made to the root path ('/'). This handler sends the index.html file as a response to any such request.

Lastly, the application starts a server on port 8888. When the server starts successfully, it logs "App server is running on port 8888" to the console.

In CSS,@font-face and :root: The @font-face rule is used to define the font family "Roboto" using a TrueType font file located at the URL provided. The :root rule sets custom properties (variables) with color values that are used throughout the rest of the CSS.

"*" and body: The * selector applies styles to all elements, setting padding and margin to 0, and assigning the "Roboto" font to all elements. The body selector applies a background image.

.round-btn and .delete-goal-btn .delete-detail-btn: These classes define the styling for the buttons and the delete button in the goal and detail section.

.page: This class styles the main page area, including setting its margin, height, and padding.

.calendar: This class (and its child selectors) styles a calendar component.

.top and .top1: These classes style the upper sections of the page, including titles, labels, boxes, and right and left sections. The .top1 section is hidden by default (display: none;).

.bottom: This class styles the bottom section of the page, including the left, center, and right sections, goals, details, and a form.

.goal-dialog: This class styles a dialog box that is hidden by default (display: none;).

The CSS also uses some CSS Flexbox properties (display: flex; along with justify-content, align-items, flex-wrap) to arrange elements within containers.

The mobile layout is set to apply when the width is 420 pixels or less.
.page: The page's margin and padding are removed, and height is set to 100%.

body: The background image is removed.

.top, .top1, .bottom: These classes have their flex-direction property set to column. This means that any direct child elements of these classes will be stacked vertically rather than horizontally.

.top > div, .top1 > div, .bottom > div: Direct child div elements of .top, .top1, and .bottom classes are set to take up 100% width. This allows them to span the full width of the screen.

.top1 .left .box div: Width of these div elements is reduced to 120px.

.bottom: The padding of the bottom section is increased to 20px.

.bottom .right .form: The form in the right section of the bottom is set to display as a flex container in a column direction. Its width property is reset to the default (initial).

select, input: The height of select and input elements is set to 31px.

.goal-dialog: The width of the dialog is reset to the default, its top property is set to 30%, left and right properties are set to 5%, and its height is increased to 170px. This likely makes the dialog take up most of the width of the screen and appear a bit down from the top.

The purpose of these changes is to optimize the layout for smaller screens, which usually involves increasing touch target sizes, simplifying layouts, and removing non-essential elements or images.

## Application Configuration 

The application configuration involves setting up the development environment. Below are the steps:

1. Install **Node.js** and **npm**.
2. Clone the repository: `git clone https://github.com/Chimera026/ycai5624-tracker.git`
3. Navigate into the project directory: `cd <project-directory>`
4. Install project dependencies: `npm install`

## Recommendations for Future Development 

- Include any user login, sign up or other authentication functionality
- Let users edit existing items
- Be deployed online with a live domain