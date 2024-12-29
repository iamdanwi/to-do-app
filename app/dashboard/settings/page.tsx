"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
    const [user, setUser] = useState({ username: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isFetching, setIsFetching] = useState(true); // New state to manage data loading

    const fetchProfile = async () => {
        try {
            const response = await axios.get("/api/users/profile");
            setUser({
                username: response.data.user?.username || "", // Fallback to empty string
                email: response.data.user?.email || "", // Fallback to empty string
            });
        } catch (err) {
            console.error("Failed to fetch user profile:", err);
        } finally {
            setIsFetching(false); // Mark fetching as complete
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSaveChanges = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await axios.put("/api/users/profile", user);
            setUser(response.data.user);
            fetchProfile();
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return <p><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading...</p>;
    }
    return (
        <div className="max-w-4xl mx-auto space-y-2 p-8 w-full">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            <Tabs defaultValue="account" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Information</CardTitle>
                            <CardDescription>Update your account settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={user.username || ""}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={user.email || ""}
                                    type="email"
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                />
                            </div>
                            {error && <p className="text-red-600">{error}</p>}
                            <Button onClick={handleSaveChanges} disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Choose what notifications you receive</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="email-notif">Email Notifications</Label>
                                <Switch id="email-notif" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="push-notif">Push Notifications</Label>
                                <Switch id="push-notif" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="task-due">Task Due Reminders</Label>
                                <Switch id="task-due" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="team-updates">Team Updates</Label>
                                <Switch id="team-updates" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>


            </Tabs>
        </div>
    )
}
