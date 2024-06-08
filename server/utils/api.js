const BASE_URL = "http://localhost:3001/api";

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`Https Error ${response.status}`)
    }
    return response.json();
};

export const fetchEvents = async () => {
    const response = await fetch(`${BASE_URL}/events`);
    return handleResponse(response);
};

export const createEvent = async (event) => {
    const response = await fetch(`${BASE_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    return handleResponse(response)
};

export const updateEvent = async(eventId, event) => {
    const response = await fetch(`${BASE_URL}/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    return handleResponse(response)
};

export const deleteEvent = async (eventId) => {
    const response = await fetch(`${BASE_URL}/events/${eventId}`, {
        method: "DELETE",
    });
    return handleResponse(response)
};