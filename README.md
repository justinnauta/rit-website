# RIT Website Re-Imagining
This website was built as a re-imagined version of RIT’s IT website. All the data is dynamically loaded from RIT’s IT API, which provides almost all the text on the page.

### Note
This application was previously made as an academic project. I moved the code to this new repository for posterity and reference purposes. Find more of my projects at [justinnauta.com](https://justinnauta.com)

## My Role

Sole Developer (The entirety of the website was developed by me)

## Technologies

React • JQuery • Bulma

## Difficulties

Since all the content of the website came from RIT’s IT API, I had to work with their formatting of the content. Each section of content was formatted a little differently, so I had to make sure I was properly retrieving the data for each individual section, rather than having a catch-all solution.

## Solution

Using React was a big step in making the problem easier to handle. React allowed me to nicely split up the code into sections, matching the website’s layout. Within each section I could handle the appropriate data differently. To figure out how the API would be giving me the data I referenced the API documentation and did some experimentation in checking what data I received. Because of this I was able to properly format the data for each section.

## Notable Features

Nearly all the website’s content is dynamically inserted after being retrieved from RIT’s IT API.
