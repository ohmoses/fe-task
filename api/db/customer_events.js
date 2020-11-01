const customer_events = [
  {
    id: 1,
    event_id: "website_ad_clicked",
    datetime: "2020-10-18T12:19:23.123Z",
    payload: {
      add_name: "Fishing equipment",
    },
  },
  {
    id: 2,
    event_id: "website_ad_clicked",
    datetime: "2020-10-18T12:22:33.123Z",
    payload: {
      add_name: "Macbook Pro",
    },
  },
  {
    id: 3,
    event_id: "website_page_view",
    datetime: "2020-10-19T20:22:33.123Z",
    payload: {
      title: "Customer Data Platform that helps you target precisely",
      url: "https://www.meiro.io/",
    },
  },
  {
    id: 4,
    event_id: "website_page_view",
    datetime: "2020-10-20T08:05:33.123Z",
    payload: {
      title: "Customer Data Platform that helps you target precisely",
      url: "https://www.meiro.io/",
    },
  },
  {
    id: 5,
    event_id: "bought_products",
    datetime: "2020-10-20T10:12:12.123Z",
    payload: {
      data: {
        name: "Milhaus",
        surname: "Potemskin",
        email: "miliha@pote.com",
        products: [
          {
            name: "Fishing rod",
          },
          {
            name: "Fishing seat with umbrella",
          },
        ],
      },
    },
  },
  {
    id: 6,
    event_id: "website_page_view",
    datetime: "2020-10-21T22:12:12.123Z",
    payload: {
      title: "Data availability",
      url: "https://www.meiro.io/product/data-availability/",
    },
  },
  {
    id: 7,
    event_id: "website_page_view",
    datetime: "2020-10-22T09:12:22.123Z",
    payload: {
      title: "Customer Data Platform that helps you target precisely",
      url: "https://www.meiro.io/",
    },
  },
  {
    id: 8,
    event_id: "website_page_view",
    datetime: "2020-10-22T09:12:59.123Z",
    payload: {
      title: "Who created Meiro CDP?",
      url: "https://www.meiro.io/people/",
    },
  },
  {
    id: 9,
    event_id: "website_page_view",
    datetime: "2020-10-22T09:13:29.123Z",
    payload: {
      title: "Meiro blog",
      url: "https://www.meiro.io/blog/",
    },
  },
  {
    id: 10,
    event_id: "contact_form_sent",
    datetime: "2020-10-22T09:13:55.123Z",
    payload: {
      name: "Fesoj",
      surname: "Luka",
      email: "fesoj@seznam.cz",
      message: "Hello world!",
    },
  },
  {
    id: 11,
    event_id: "newsletter_subscribed",
    datetime: "2020-10-22T09:14:02.123Z",
    payload: {
      subscribed_email: "dracula@meiro.io",
    },
  },
  {
    id: 12,
    event_id: "opened_campaign",
    datetime: "2020-10-24T10:20:02.123Z",
    payload: {
      campaign_name: "Meiro News | Email marketing as the biggest ROI driver",
    },
  },
  {
    id: 13,
    event_id: "newsletter_unsubscribed",
    datetime: "2020-10-24T10:59:02.123Z",
    payload: {
      unsubscribed_email: "dracula@meiro.io",
    },
  },
];

export default customer_events;
