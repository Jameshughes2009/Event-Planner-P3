import { gql } from "@apollo/client";

// Query to get all users along with their events
export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      username
      email
      events {
        id
        title
        cost
        description
        location
      }
    }
  }
`;

// Query to get a single user by ID along with their events
export const GET_ONE_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      username
      email
      events {
        id
        title
        description
        cost
        location
        date
      }
    }
  }
`;

// Query to get all events along with the associated user
export const GET_ALL_EVENTS = gql`
  query Events {
    events {
      id
      title
      description
      cost
      location
      date
      user {
        id
        username
      }
    }
  }
`;

// Query to get a single event by ID along with the associated user
export const GET_ONE_EVENT = gql`
  query Query($eventId: ID!) {
    event(id: $eventId) {
      id
      title
      description
      cost
      location
      user {
        id
        username
      }
      date
    }
  }
`;

// Mutation to delete an event
export const DELETE_EVENT = gql`
  mutation DELETE_EVENT($deleteEventId: ID!) {
    deleteEvent(id: $deleteEventId)
  }
`;
