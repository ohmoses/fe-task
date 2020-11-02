const events = [
  {
    id: "website_ad_clicked",
    source_id: "meiro_events",
    title: "Customer clicked on website ad",
    short_title: "Ad clicked",
  },
  {
    id: "website_page_view",
    source_id: "meiro_events",
    title: "Customer visited website page",
    short_title: "Page visited",
  },
  {
    id: "contact_form_sent",
    source_id: "meiro_events",
    title: "Customer sent contact form",
    short_title: "Contact form sent",
  },
  {
    id: "opened_campaign",
    source_id: "mailchimp",
    title: "Customer opened campaign",
    short_title: "Campaign opened",
  },
  {
    id: "newsletter_subscribed",
    source_id: "mailchimp",
    title: "Subscribed to a newsletter",
    short_title: "Newsletter subscribed",
  },
  {
    id: "newsletter_unsubscribed",
    source_id: "mailchimp",
    title: "Unsubscribed from a newsletter",
    short_title: "Newsletter unsubscribed",
  },
  {
    id: "bought_products",
    source_id: "prestashop",
    title: "Customer bought products",
    short_title: "Order submitted",
  },
];

export default events;
