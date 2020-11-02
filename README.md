# Assignment for FE adepts

In case of questions feel free to reach me out on [jirka@meiro.io](mailto:jirka@meiro.io)

Your task will be to create a SPA using React and other libraries of your choice. We prepared API endpoints for you and UI design in Figma ([link](https://www.figma.com/file/T923VtGAxtxaXHOjZ98gF4/CDP-dev?node-id=0%3A1)). As you can see, the app consists of two pages (use React router):

- Customers list with search functionality
- Customer detail

## What we'll be evaluating?

We'll focus on:

- User experience
- Clean and well-structured code with reusable components
- Solution without bugs and covered by quality tests

We don't want you to make responsive version, **only desktop**.

### Unit tests

We ask you to create unit tests for `Search` component on `Customer search` page and for `Group of events` on `Customer detail` page. **We don't want you to cover the whole solution by tests!**

## Assignment instructions

There's `assets` folder which includes source icons and customer avatars. Other icons you can see in figma is obtainable from [FontAwesome](https://fontawesome.com/).

### Customers list

This will be the main screen of the application. When you first reach it, there will be only upper bar with `Customers search` title and search bar. Once you make some search (**even empty search is allowed to list all customers**), the table will be populated by results. Feel free to adjust column names by what you get in response, the design is not 1:1 precise. We don't want any kind of sorting functionality etc.

You can click on the customer to view his detail or you can additionally load more customers.

### Customer detail

Here you can find additional information about your customers, especially the timeline of their events. At the top of the page, there's `back button` followed by header bar which contains customer name and a list of sources. The greyed sources are these ones where the customer doesn't have any event.

Finally, there's a timeline of events, which will be by default collapsed (if there're any expandable parts for some customer). It has `day` resolution, which means you have to group multiple events into expandable parts of the page and these events are hidden by default. You can toggle the groups by clicking on the `arrow` button on the right side. If there's only one event on a particular day, it's shown by default.

## API reference

API server can be started by `yarn start` or `npm start` command, at first you need to do `yarn install` or `npm install` of course.

### GET /customers

Returns a list of customers. Additionally, you can specify `offset`, `limit` and `search` query parameters in URL. `offset` and `limit` has to be numbers, `limit` cannot be greater than `20`.

#### Example response

```
{
  customers: [
    {
      id: "powr948fadspof923902faspoaqewr",
      name: "Pavel",
      surname: "Sahanek",
      created: "2020-10-11T12:22:22.123Z",
    },
    {
      id: "p234we8fadspof923902faspoaqewr",
      name: "Martin",
      surname: "Kouba",
      created: "2020-09-10T12:22:22.123Z",
    }
  ],
  selection_settings: {
    offset: 0,
    limit: 20,
    search: ""
  }
}
```

### GET /customers/:id

Returns customer by id.

#### Example response

```
{
  customer: {
    id: "powr948fadspof923902faspoaqewr",
    name: "Pavel",
    surname: "Sahanek",
    created: "2020-10-11T12:22:22.123Z",
  }
}
```

### GET /customers/:id/events

Returns customer's events.

#### Example response

```
{
  customer_events: [
    {
      id: 2,
      event_id: "website_ad_clicked",
      datetime: "2020-10-18T12:22:33.123Z"
    },
    {
      id: 3,
      event_id: "website_page_view",
      datetime: "2020-10-19T20:22:33.123Z"
    }
  ]
}
```

### GET /sources

Returns events' sources.

#### Example response

```
{
  sources: [
    {
      id: "meiro_events",
      name: "Meiro Events",
      frontend_settings: {
        icon: "meiro_events.png",
        color: "#B85888",
      },
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      frontend_settings: {
        icon: "mailchimp.png",
        color: "#FBB962",
      }
    }
  ]
}
```

### GET /events

Returns events' definitions.

#### Example response

```
{
  events: [
    {
      id: "website_ad_clicked",
      source_id: "meiro_events",
      title: "Customer clicked on website ad",
      short_title: "Ad clicked"
    },
    {
      id: "website_page_view",
      source_id: "meiro_events",
      title: "Customer visited website page",
      short_title: "Page visited"
    }
  ]
}
```
