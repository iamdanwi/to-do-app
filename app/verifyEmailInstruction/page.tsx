"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

function ResendEmailContent() {
    const [isResending, setIsResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [email, setEmail] = useState("");

    const searchParams = useSearchParams();

    useEffect(() => {
        const userEmail = searchParams.get("email") as string;
        if (userEmail) {
            setEmail(userEmail);
        }
    }, [searchParams]);

    const handleResendEmail = async (userEmail: string) => {
        setIsResending(true);
        setResendSuccess(false);

        try {
            const response = await axios.post("/api/users/resend-verification-email", { email: userEmail });
            if (response.status === 200) {
                console.log("Email verification successfully sent.");
                setResendSuccess(true);
            }
        } catch (error) {
            console.error("Error resending verification email:", error);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="container flex min-h-screen items-center justify-center mx-auto">
            <Card className="mx-auto w-full max-w-[400px]">
                <CardHeader className="space-y-4">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-primary/10 p-4">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <CardTitle className="text-2xl">Check your email</CardTitle>
                        <CardDescription className="text-base">
                            We&apos;ve sent a verification link to<br />
                            <span className="font-medium text-foreground">{email}</span>
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p>To complete your signup:</p>
                        <ol className="list-decimal pl-4 space-y-1">
                            <li>Check your email inbox for the verification link</li>
                            <li>Click the &quot;Verify Email&quot; button in the email</li>
                            <li>You&apos;ll be redirected back to complete verification</li>
                        </ol>
                    </div>

                    {resendSuccess && (
                        <Alert>
                            <AlertDescription className="text-sm text-green-600">
                                A new verification link has been sent to your email.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="text-sm text-center space-y-1">
                        <p className="text-muted-foreground">
                            Didn&apos;t receive the email?
                        </p>
                        <Button
                            variant="link"
                            className="text-primary p-0 h-auto font-normal"
                            onClick={() => handleResendEmail(email)}
                            disabled={isResending}
                        >
                            {isResending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resending...
                                </>
                            ) : (
                                'Click to resend verification email'
                            )}
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        variant="link"
                        className="text-sm text-muted-foreground h-auto"
                        asChild
                    >
                        <Link href="/login">Back to login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResendEmailContent />
        </Suspense>
    );
}
