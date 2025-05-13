# Department Posts Viewer Task

## Objective

Create a functional React component with TypeScript that fetches and displays posts from JSONPlaceholder API, with filtering and sorting capabilities.

## Requirements

1.  Create a functional component using React and TypeScript
2.  Fetch data from  https://jsonplaceholder.typicode.com/posts
3.  Display the all posts and the total number of posts retrieved
4.  Store posts in constants/state
5.  Create and implement a Post data interface with an array of posts
6.  Display alerts using Material UI components
7.  Implement a reusable generic function that can filter an array of items by a specific field and value
8.  Implement a reusable generic function that can sort an array of items by a specific field
9.  Return appropriate JSX to display the data

## Technical Specifications

### Post Interface

Define an interface for post data with the following properties:

-   userId (number)
-   id (number)
-   title (string)
-   body (string)

### Generic Filter Function

-   Create a function that accepts any array of objects, a field name, and a value
-   The function should return a filtered array containing only items matching the criteria
-   Include an option for partial matching on string fields

### Generic Sort Function

-   Create a function that accepts any array of objects, a field name, and a sort order ('asc' or 'desc')
-   The function should return a sorted array based on the specified field and order

### UI Requirements

-   Use Material UI components for the interface
-   Display an alert showing the number of posts retrieved
-   Provide UI controls for filtering and sorting posts

## Dependencies

-   React
-   TypeScript
-   Material UI (@mui/material, @emotion/react, @emotion/styled)

## Deliverables

-   A functional React component that meets all requirements
-   Properly typed interfaces and functions
-   Clean, maintainable code with appropriate comments

## Evaluation Criteria

-   Correct implementation of TypeScript interfaces and generics
-   Proper use of React hooks for state management
-   Functionality of filtering and sorting features
-   Code organization and readability
-   Error handling for API requests
