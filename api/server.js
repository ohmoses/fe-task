import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import db from "./db";

const app = express();
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// customers
app.get("/customers", (req, res) => {
  const { query } = req;
  if (query.offset === undefined) {
    query.offset = 0;
  }
  if (query.limit === undefined) {
    query.limit = 20;
  }
  const offset = parseInt(query.offset);
  const limit = parseInt(query.limit);
  const search = query.search ? query.search.trim().toLowerCase() : "";
  if (isNaN(offset) || isNaN(limit)) {
    return res.status(400).send({
      message: "Params offset and limit must be integer",
    });
  } else if (offset < 0 || limit < 0) {
    return res.status(400).send({
      message: "Params offset and limit must be >= 0",
    });
  } else if (limit > 20) {
    return res.status(400).send({
      message: "Limit cannot be greater than 20",
    });
  }
  let response = db.customers.slice(offset, offset + limit);
  if (search) {
    response = response.filter((customer) => {
      return (
        customer.name.trim().toLowerCase().includes(search) ||
        customer.surname.trim().toLowerCase().includes(search)
      );
    });
  }
  return res.status(200).send({
    customers: response,
    selection_settings: {
      offset,
      limit,
      search,
    },
  });
});

const getCustomer = (id) => db.customers.find((customer) => customer.id === id);
app.get("/customers/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const customer = getCustomer(id);
  if (!customer) {
    return res.status(404).send({
      message: "Customer not found",
    });
  }
  return res.status(200).send({
    customer,
  });
});

app.get("/customers/:id/events", (req, res) => {
  const {
    params: { id },
  } = req;
  const customer = getCustomer(id);
  if (!customer) {
    return res.status(404).send({
      message: "Customer not found",
    });
  }

  const hash = (customerId) => {
    let hash = 0,
      start = 0,
      chr,
      end = customerId.length;
    for (start = 0; start < end; start++) {
      chr = customerId.charCodeAt(start);
      hash = (hash << 5) - hash + chr;
      //convert to 32 bit integer
      hash |= 0;
    }
    return Math.abs(hash % 13) + 1;
  };

  const eventsCount = hash(id);
  return res.status(200).send({
    customer_events: db.customer_events.slice(0, eventsCount),
  });
});

// sources
app.get("/sources", (_, res) => {
  return res.status(200).send({
    sources: db.sources,
  });
});

// events
app.get("/events", (_, res) => {
  return res.status(200).send({
    events: db.events,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
