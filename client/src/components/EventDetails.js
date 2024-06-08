import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import { useParams, Link } from "react-router-dom"; // Importing routing functionalities
import { useQuery } from "@apollo/client"; // Importing Apollo Client hook for querying

// import placeholder from "../assets/placeholder.png"; // Importing placeholder image
import { GET_ONE_EVENT } from "../utils/queries"; // Importing GraphQL query to get one event
import {
  Container,
  Card,
  Col,
  Form,
  Button,
  Row,
  Alert,
  ButtonGroup,
  Stack,
  OverlayTrigger,
} from "react-bootstrap"; // Importing Bootstrap components for styling

const EventDetails = () => {
  // State to manage event data
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    cost: 0,
    location: "",
    date: "",
    time: 0,
  });

  // State to manage countdown timer
  const [countDown, setCountDown] = useState();
  const [countDownFormat, setCountDownFormat] = useState({
    timeRemaining: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { eventId } = useParams(); // Extracting eventId from URL parameters

  // Fetch event data using useQuery hook
  const { loading, error, data } = useQuery(GET_ONE_EVENT, {
    variables: { eventId: eventId },
  });

  // Effect to handle data loading
  useEffect(() => {
    if (!loading) {
      console.log(data);
      const timeStamp = parseInt(data.event.date);
      const date = new Date(timeStamp);
      const dateString = date.toLocaleDateString();
      const timeString = date.toLocaleTimeString();
      setEventData({
        title: data.event.title,
        description: data.event.description,
        cost: data.event.cost,
        location: data.event.location,
        date: dateString,
        time: timeString,
      });
      setCountDown(timeStamp);
    }
  }, [loading]);

  // Effect to handle countdown timer
  useEffect(() => {
    if (!countDown) return;

    const now = new Date().getTime(); // Current date and time in milliseconds

    const intervalId = setInterval(() => {
      setCountDown(countDown - 1); // Decrease countdown by 1 each second
    }, 1000);

    const timeDifference = countDown - now; // Calculate time difference

    if (timeDifference <= 0) {
      // If time is up, set countdown to zero
      setCountDownFormat({
        timeRemaining: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    } else {
      // Calculate days, hours, minutes, and seconds remaining
      const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        timeDifference / (1000 * 60 * 60) - daysLeft * 24
      );
      const minutesLeft = Math.floor(
        timeDifference / (1000 * 60) - (daysLeft * 24 * 60 + hoursLeft * 60)
      );
      const secondsLeft = Math.floor(
        timeDifference / 1000 -
          (daysLeft * 24 * 60 * 60 + hoursLeft * 60 * 60 + minutesLeft * 60)
      );

      // Update countdown format state
      setCountDownFormat({
        timeRemaining: timeDifference,
        days: daysLeft,
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
      });
    }

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [countDown]);

  const countDownStyle = {
    height: "300px",
    background: "linear-gradient(to right, pink, orange)", // Gradient background for countdown timer
  };

  const buttonStyle = {
    backgroundColor: "#FFA500", // Button background color
    borderColor: "#FFA500", // Button border color
    borderRadius: "5px", // Button border radius
    width: "20%", // Button width
    margin: "3%", // Button margin
  };

  return (
    <>
      {/* Countdown timer */}
      <Container
        fluid
        style={countDownStyle}
        className="text-center p-5 text-white"
      >
        {countDownFormat.timeRemaining > 0 ? (
          <h2 className="p-2">
            GET EXCITED! {eventData.title.toUpperCase()} COMING SOON!
          </h2>
        ) : (
          <>
            <h2 className="p-2">
              {eventData.title.toUpperCase()} HAS ALREADY PASSED!
            </h2>
            <a href="/allEvents" style={{ color: "white" }}>
              Check out all events to see more
            </a>
          </>
        )}
        <Stack
          direction="horizontal"
          gap={3}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
            color: "white",
          }}
        >
          <Row className="justify-content-center">
            <Col className="text-center">
              <div>
                <div>{countDownFormat.days}</div>
                <div style={{ fontSize: "25px" }}>Days</div>
              </div>
            </Col>
            <Col className="text-center">
              <div>
                <div>{countDownFormat.hours}</div>
                <div style={{ fontSize: "25px" }}>Hours</div>
              </div>
            </Col>
            <Col className="text-center">
              <div>
                <div>{countDownFormat.minutes}</div>
                <div style={{ fontSize: "25px" }}>Minutes</div>
              </div>
            </Col>
            <Col className="text-center">
              <div>
                <div>{countDownFormat.seconds}</div>
                <div style={{ fontSize: "25px" }}>Seconds</div>
              </div>
            </Col>
          </Row>
        </Stack>
      </Container>

      {/* Event details */}
      <Container>
        <ButtonGroup className="w-100">
          <Button style={buttonStyle}>Date: {eventData.date}</Button>
          <Button style={buttonStyle}>Time: {eventData.time}</Button>
          <Button style={buttonStyle}>Location: {eventData.location}</Button>
          <Button style={buttonStyle}>Cost: ${eventData.cost}</Button>
        </ButtonGroup>
        <Container className="mb-5">
          <Row>
            <Col md={6}>
              <Card className="border-0 p-3">
                <Card.Body>
                  <Card.Title>{eventData.title}</Card.Title>
                  <Card.Text>{eventData.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              {/* <Card.Img
                variant="top"
                className="border-0 p-3 h-100"
                src={placeholder}
              /> */}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default EventDetails; // Exporting EventDetails component
