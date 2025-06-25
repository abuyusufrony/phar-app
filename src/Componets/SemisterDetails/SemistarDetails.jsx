import React, { useState, useEffect, useCallback } from "react";
import { semesterData } from "../../data";
import { FaChevronRight, FaSearch, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SemistarDetails = () => {
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const [subjectSearch, setSubjectSearch] = useState("");
    const [topicSearch, setTopicSearch] = useState("");

    // Clear searches when semester/subject changes
    useEffect(() => {
        setSubjectSearch("");
        setTopicSearch("");
    }, [selectedSemester, selectedSubject]);

    // Debounce hook for better UX (wait 300ms after typing stops)
    const useDebounce = (value, delay) => {
        const [debounced, setDebounced] = useState(value);
        useEffect(() => {
            const handler = setTimeout(() => setDebounced(value), delay);
            return () => clearTimeout(handler);
        }, [value, delay]);
        return debounced;
    };

    const debouncedSubjectSearch = useDebounce(subjectSearch, 300);
    const debouncedTopicSearch = useDebounce(topicSearch, 300);

    // Filtered lists based on debounced search terms
    const filteredSubjects = selectedSemester?.subjects.filter((subj) =>
        subj.name.toLowerCase().includes(debouncedSubjectSearch.toLowerCase())
    ) || [];

    const filteredTopics = selectedSubject?.topics.filter((topic) =>
        topic.title.toLowerCase().includes(debouncedTopicSearch.toLowerCase())
    ) || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 0 to-white p-6 .dark:bg-gray-90">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">📚  Explore Your Learning Journey</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">

                {/* Semester List */}
                <div className="bg-white rounded-2xl shadow p-4 space-y-2">

                    <div className="text-lg font-semibold text-gray-700 mb-4">
                        {selectedTopic
                            ? "Topic Details"
                            : selectedSubject
                                ? "Topics"
                                : selectedSemester
                                    ? "Subjects"
                                    : "Select a Semester"}
                    </div>

                    {semesterData.map((sem, i) => {
                        const isSelected = selectedSemester?.semester === sem.semester;
                        return (
                            <div key={i} className="mb-2">
                                <button
                                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all duration-300 shadow-sm text-left ${isSelected ? "bg-blue-100 border-blue-400" : "bg-white border-gray-200 hover:border-blue-300"
                                        }`}
                                    onClick={() => {
                                        if (isSelected) {
                                            setSelectedSemester(null);
                                            setSelectedSubject(null);
                                            setSelectedTopic(null);
                                        } else {
                                            setSelectedSemester(sem);
                                            setSelectedSubject(null);
                                            setSelectedTopic(null);
                                        }
                                    }}
                                >
                                    <span className="flex items-center gap-3 text-gray-800 font-medium">
                                        <motion.div
                                            animate={{ rotate: isSelected ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FaChevronRight />
                                        </motion.div>
                                        {sem.semester}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-2 ml-6 border-l border-blue-200 pl-4"
                                        >
                                            <div className="text-sm text-blue-800 font-semibold">{sem.semester} Semesters</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Subject List */}
                <div className="bg-white rounded-2xl shadow p-4 space-y-3">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FaSearch className="text-orange-400" /> Subjects
                    </h2>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Subjects..."
                            value={subjectSearch}
                            onChange={(e) => setSubjectSearch(e.target.value)}
                            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        />
                        {subjectSearch && (
                            <button
                                onClick={() => setSubjectSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                                aria-label="Clear subject search"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    {filteredSubjects.length > 0 ? (
                        filteredSubjects.map((subj) => (
                            <button
                                key={subj.id}
                                className={`w-full text-left px-4 py-2 rounded-lg transition duration-200 hover:bg-purple-100 ${selectedSubject?.id === subj.id ? "bg-purple-200 font-semibold" : "bg-gray-50"
                                    }`}
                                onClick={() => {
                                    setSelectedSubject(subj);
                                    setSelectedTopic(null);
                                    setTopicSearch(""); // reset topic search when subject changes
                                }}
                            >
                                <div className="text-sm text-gray-800">{subj.name}</div>
                                <div className="text-xs text-gray-500">{subj.code}</div>
                            </button>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 italic mt-2">No subjects found</div>
                    )}
                </div>

                {/* Topic List */}
                <div className="bg-white rounded-2xl shadow p-4 space-y-3">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FaSearch className="text-green-400" /> Topics
                    </h2>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Topics..."
                            value={topicSearch}
                            onChange={(e) => setTopicSearch(e.target.value)}
                            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                            disabled={!selectedSubject}
                        />
                        {topicSearch && (
                            <button
                                onClick={() => setTopicSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                                aria-label="Clear topic search"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    {selectedSubject ? (
                        filteredTopics.length > 0 ? (
                            filteredTopics.map((topic, index) => (
                                <button
                                    key={index}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition duration-200 hover:bg-green-100 ${selectedTopic?.title === topic.title ? "bg-green-200 font-semibold" : "bg-gray-50"
                                        }`}
                                    onClick={() => setSelectedTopic(topic)}
                                >
                                    {topic.title}
                                </button>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 italic mt-2">No topics found</div>
                        )
                    ) : (
                        <div className="text-center text-gray-400 italic mt-2">Select a subject to view topics</div>
                    )}
                </div>

                {/* Topic Content */}
                <div className="bg-white rounded-2xl shadow p-4 overflow-auto max-h-[600px]">
                    {selectedTopic ? (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedTopic.title}</h2>
                            <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
                                {selectedTopic.content}
                            </p>
                            {selectedTopic.video && (
                                <div className="aspect-video">
                                    <iframe
                                        className="w-full h-full rounded-lg"
                                        src={selectedTopic.video}
                                        title="YouTube video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-gray-500 italic">Select a topic to view content</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SemistarDetails;
