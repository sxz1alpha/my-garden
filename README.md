# My Garden
Have confidence planting your garden with this plant information application! Search for the plants you want to know more about, get their relevant planting information, see videos related to them, and even save them to your *My Garden* for quick reference in the future.


## User Story

**AS AN** amateur gardener,
**I WANT** an application that allows me to search for the plants I want to grow in my garden and save them for quick reference,
**SO THAT** I can access important information on how to grow and maintain different plants and have access to the plants I am growing in my garden.


## Description
Type in the name of the plant you want to find and click search.
    * You will be presented with a list of results from the openfarm.cc API.
    * Select one to be presented with a modal of information about that plant including related videos via the YouTube API. 
    * Select the *Add To My Garden* to add the plant to the *My Garden* section.


Select a plant in the *My Garden* section to get the modal of information displayed again. You can also remove added plants or clear all plants in your list. These are stored via `localStorage` for persistance.


## Screenshot



## Link

https://sxz1alpha.github.io/my-garden/


## Resources

CSS Framework: https://materializecss.com/
Plant Info API: https://openfarm.cc/
YouTube Video API: https://developers.google.com/youtube/v3/docs/search/list