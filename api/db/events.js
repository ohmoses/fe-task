const events = [
  {
    id: "website_ad_clicked",
    source_id: "meiro_events",
    icon: "hand-pointer",
    title: "Customer clicked on website ad",
    short_title: "Ad clicked",
    display: [
      {
        title: "Ad name",
        type: "string",
        format: "p",
        path: "add_name",
      },
    ],
  },
  {
    id: "website_page_view",
    source_id: "meiro_events",
    icon: "eye",
    title: "Customer visited website page",
    short_title: "Page visited",
    display: [
      {
        title: "Title",
        type: "string",
        format: "p",
        path: "title",
      },
      {
        title: "URL",
        type: "string",
        format: "ahref",
        path: "url",
      },
    ],
  },
  {
    id: "contact_form_sent",
    source_id: "meiro_events",
    icon: "paper-plane",
    title: "Customer sent contact form",
    short_title: "Contact form sent",
    display: [
      {
        title: "Name",
        type: "string",
        format: "p",
        path: "data.name",
      },
      {
        title: "Surname",
        type: "string",
        format: "p",
        path: "data.surname",
      },
      {
        title: "Email",
        type: "string",
        format: "p",
        path: "data.email",
      },
      {
        title: "Message",
        type: "string",
        format: "p",
        path: "data.message",
      },
    ],
  },
  {
    id: "opened_campaign",
    source_id: "mailchimp",
    icon: "envelope-open",
    title: "Customer opened campaign",
    short_title: "Campaign opened",
    display: [
      {
        title: "Campaign name",
        type: "string",
        format: "p",
        path: "campaign_name",
      },
    ],
  },
  {
    id: "newsletter_subscribed",
    source_id: "mailchimp",
    icon: "sign-in",
    title: "Customer subscribed to newsletter",
    short_title: "Newsletter subscribed",
    display: [
      {
        title: "Used email",
        type: "string",
        format: "p",
        path: "subscribed_email",
      },
    ],
  },
  {
    id: "newsletter_unsubscribed",
    source_id: "mailchimp",
    icon: "sign-out",
    title: "Customer unsubscribed from newsletter",
    short_title: "Newsletter unsubscribed",
    display: [
      {
        title: "Unsubscribed email",
        type: "string",
        format: "p",
        path: "unsubscribed_email",
      },
    ],
  },
  {
    id: "bought_products",
    source_id: "prestashop",
    icon: "shopping-cart",
    title: "Customer bought products",
    short_title: "Order submitted",
    display: [
      {
        title: "Name",
        type: "string",
        format: "p",
        path: "data.name",
      },
      {
        title: "Surname",
        type: "string",
        format: "p",
        path: "data.surname",
      },
      {
        title: "Email",
        type: "string",
        format: "p",
        path: "data.email",
      },
      {
        title: "Products",
        type: "string",
        format: "ul",
        path: "data.products[].name",
      },
    ],
  },
];

export default events;
