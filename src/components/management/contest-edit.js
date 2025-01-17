import React, { useState, useEffect, useRef } from "react";
import { Editor, EditorState, ContentState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import axios from "axios";

function ContestEditForm({ idContest, onClose, reloadContests }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState(() => EditorState.createEmpty());
    const [price, setPrice] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const editorRef = useRef();

    const focus = () => {
        editorRef.current.focus();
    };

    const fetchContest = async () => {
        try {
            const response = await axios.get(`http://localhost:5231/api/Contest/detail/${idContest}`);
            const contest = response.data.contest;

            setName(contest.name);
            setPrice(contest.price);
            setStartDate(contest.startDate);
            setEndDate(contest.endDate);
            setStatus(contest.status)

            if (contest.description) {
                const contentState = ContentState.createFromText(contest.description);
                setDescription(EditorState.createWithContent(contentState));
            }
            setLoading(false);
        } catch (err) {
            setError("Failed to load contest details.");
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const parsedDate = new Date(date);
        return parsedDate.toISOString().split('T')[0];
    };

    const handleStartDateChange = (value) => {
        setStartDate(value);

        // Validate ngay khi thay đổi
        const dateErrors = validateDate(value, endDate);
        setErrors((prevErrors) => ({
            ...prevErrors,
            startDate: dateErrors.startDate || null, // Chỉ cập nhật lỗi startDate
        }));
    };

    const handleEndDateChange = (value) => {
        setEndDate(value);

        // Validate ngay khi thay đổi
        const dateErrors = validateDate(startDate, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            endDate: dateErrors.endDate || null, // Chỉ cập nhật lỗi endDate
        }));
    };

    const validateDate = (startDate, endDate) => {
        const errors = {};
        const now = new Date().getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();

        if (!startDate) errors.startDate = "Start date is required.";
        else if (!isNaN(start) && start < now) {
            errors.startDate = "Start date must be in the future.";
        }

        if (!endDate) errors.endDate = "End date is required.";
        else if (!isNaN(end) && end < now) {
            errors.endDate = "End date must be in the future.";
        }

        if (!isNaN(start) && !isNaN(end) && start >= end) {
            errors.endDate = "End date must be after the start date.";
        }

        return errors;
    };

    const validate = () => {
        const errors = {};
        if (!name.trim()) errors.name = "Name is required.";
        if (!description.getCurrentContent().hasText()) errors.description = "Description is required.";
        if (price < 0) errors.price = "Price must be greater than or equal to 0.";
        if (!startDate) errors.startDate = "Start date is required.";
        if (!endDate) errors.endDate = "End date is required.";

        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const now = Date.now();
        console.log(start + " " + now)

        if (start < now) errors.startDate = "Start date must be in the future.";
        if (end < now) errors.endDate = "End date must be in the future.";
        if (start >= end) errors.endDate = "End date must be after the start date.";
        console.log("err" + errors.startDate)
        return errors;
    };

    const handleSave = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const descriptionText = description.getCurrentContent().getPlainText();

            await axios.put(`http://localhost:5231/api/Contest/update/${idContest}`, {
                name,
                description: descriptionText,
                price,
                startDate,
                endDate,
                status,
            });

            alert("Contest updated successfully!");

            if (reloadContests) {
                await reloadContests();
            }
            if (onClose) {
                onClose(); 
            }
        } catch (err) {
            alert("Failed to update contest. Please try again.");
        }
    };


    useEffect(() => {
        fetchContest();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Edit Contest</h2>

            <div style={{ marginBottom: "15px" }}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "100%", padding: "8px", margin: "5px 0" }}
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label htmlFor="description">Description:</label>
                <div style={{ border: "1px solid #ddd", minHeight: "150px", padding: "10px" }} onClick={focus}>
                    <Editor
                        ref={editorRef}
                        editorState={description}
                        onChange={(editorState) => setDescription(editorState)}
                    />
                </div>
                {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label htmlFor="price">Price ($):</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                    style={{ width: "100%", padding: "8px", margin: "5px 0" }}
                />
                {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    value={formatDate(startDate)}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    style={{ width: "100%", padding: "8px", margin: "5px 0" }}
                />
                {errors.startDate && <p style={{ color: "red" }}>{errors.startDate}</p>}
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label htmlFor="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    value={formatDate(endDate)}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    style={{ width: "100%", padding: "8px", margin: "5px 0" }}
                />
                {errors.endDate && <p style={{ color: "red" }}>{errors.endDate}</p>}
            </div>


            <div style={{ marginBottom: "15px" }}>
                <label htmlFor="status">Status</label>
                <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ width: "100%", padding: "8px", margin: "5px 0" }}
                />
                {errors.endDate && <p style={{ color: "red" }}>{errors.endDate}</p>}
            </div>

            <button
                onClick={handleSave}
                style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px" }}
            >
                Save
            </button>
        </div>
    );
}

export default ContestEditForm;
