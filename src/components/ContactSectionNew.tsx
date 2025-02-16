import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { portfolioData } from "../data/portfolio";
import { staggerContainer, fadeInUp } from "../animations";
import { useEffect, useRef, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
    "793504329671-k0aupsvr8ugnlri0badpulvve5l6ns18.apps.googleusercontent.com"; //REPLACE
const SCOPES = "https://www.googleapis.com/auth/gmail.send";

export const ContactSectionNew = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        function initGapi() {
            if (!window.gapi) {
                console.warn("gapi is not loaded yet.  Retrying...");
                setTimeout(initGapi, 500);
                return;
            }

            gapi.load("client:auth2", () => {
                gapi.client
                    .init({
                        clientId: CLIENT_ID,
                        scope: SCOPES,
                    })
                    .then(() => {
                        const authInstance = gapi.auth2.getAuthInstance();
                        setIsSignedIn(authInstance.isSignedIn.get());
                        authInstance.isSignedIn.listen(setIsSignedIn);
                        console.log("gapi initialized successfully.  isSignedIn:", authInstance.isSignedIn.get()); //Log success
                    })
                    .catch((error) => {
                        console.error("Error initializing gapi:", error);
                    });
            });
        }

        initGapi();
    }, []);

    const handleSignIn = () => {
        console.log("Attempting to sign in...");
        gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(() => {
                console.log("Sign-in successful.");
            })
            .catch((error) => {
                console.error("Sign-in error:", error);
                alert("Sign-in failed: " + error.message);
            });
    };

    const handleSignOut = () => {
        console.log("Signing out...");
        gapi.auth2
            .getAuthInstance()
            .signOut()
            .then(() => {
                setIsSignedIn(false);
                console.log("Sign-out successful.");
            })
            .catch((error: { message: string; }) => {
                console.error("Sign-out error:", error);
                alert("Sign-out failed: " + error.message);
            });
    };

    const sendEmail = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (isSubmitting) return;
        if (!isSignedIn) {
            alert("Please sign in with Google to send an email.");
            return;
        }

        const contactForm = formRef.current;
        if (!contactForm) {
            alert("Form not found. Please refresh and try again.");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData(contactForm);
        const to = "recipient@example.com"; // Replace
        const subject = formData.get("user_name") + " - Contact Form Submission";
        const body = `Name: ${formData.get("user_name")}\nEmail: ${formData.get(
            "user_email"
        )}\nMessage:\n${formData.get("message")}`;

        const emailContent = [
            `To: ${to}`,
            "Subject: " + subject,
            "Content-Type: text/plain; charset=utf-8",
            "",
            body,
        ].join("\n");

        const base64EncodedEmail = btoa(emailContent)
            .replace(/\+/g, "-")
            .replace(/\//g, "_");

        try {
            const response = await gapi.client.gmail.users.messages.send({
                userId: "me",
                resource: { raw: base64EncodedEmail },
            });

            console.log("Email sent!", response);
            contactForm.reset();
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Failed to send email", error);
            alert("Failed to send message. Please try again later. "+ error); // Show error message to the user
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.section
            id="contact"
            className="py-20 bg-white dark:bg-gray-900"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
        >
            <div className="max-w-7xl mx-auto px-4">
                <motion.h2 className="text-3xl font-bold mb-8" variants={fadeInUp}>
                    Contact Me
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={fadeInUp}>
                        <p className="text-lg mb-6">
                            Feel free to reach out! I'm always open to discussing new
                            projects, creative ideas, or opportunities to be part of your
                            visions.
                        </p>
                        <div className="space-y-4">
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">Email:</span>
                                <motion.a
                                    href={`mailto:${portfolioData.personal.email}`}
                                    className="text-blue-600 hover:text-blue-700"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {portfolioData.personal.email}
                                </motion.a>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">Location:</span>
                                {portfolioData.personal.location}
                            </p>
                            <motion.div className="flex gap-4" variants={staggerContainer}>
                                <motion.a
                                    href={portfolioData.personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Github className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    href={portfolioData.personal.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <Linkedin className="w-6 h-6" />
                                </motion.a>
                            </motion.div>
                        </div>
                        <div className="mt-4">
                            {!isSignedIn ? (
                                <button
                                    onClick={handleSignIn}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                >
                                    Sign in with Google
                                </button>
                            ) : (
                                <button
                                    onClick={handleSignOut}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </motion.div>
                    <motion.form
                        className="space-y-6"
                        variants={fadeInUp}
                        id="contact-form"
                        ref={formRef}
                        onSubmit={sendEmail}
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Name
                            </label>
                            <motion.input
                                type="text"
                                id="name"
                                name="user_name"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                whileFocus={{ scale: 1.01 }}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Email
                            </label>
                            <motion.input
                                type="email"
                                id="email"
                                name="user_email"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                whileFocus={{ scale: 1.01 }}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Message
                            </label>
                            <motion.textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                whileFocus={{ scale: 1.01 }}
                                required
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={!isSignedIn || isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </motion.section>
    );
};