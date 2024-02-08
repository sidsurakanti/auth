"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Social } from "@/components/auth/social";
import { Button } from "@/components/ui/button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[325px] shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <Button variant="link" className="w-full" asChild>
          <Link
            className="hover:text-blue-500 font-normal"
            href={backButtonHref}
          >
            {backButtonLabel}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
