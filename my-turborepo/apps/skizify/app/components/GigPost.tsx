"use client";
import * as React from "react";

import { Button } from "../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";

import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import Datepick from "./Datepick";
export function GigPost() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Post your gig</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input id="name" placeholder="title lof project" />
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <Input id="name" placeholder="this is my description" />
              </div>
              <div className="grid w-full items-center gap-4">
                <Label htmlFor="name">Timeslot</Label>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Date</Label>
                    <Input
                      id="datetime"
                      type="date"
                      placeholder="this is my description"
                    />
                  </div>
                </div>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Time</Label>
                    <Input
                      id="datetime"
                      type="time"
                      placeholder="this is my description"
                    />
                  </div>
                </div>
              </div>
              <div className="grid w-full items-center gap-4">
                <div className="flex items-center justify-center">
                  <Label htmlFor="name">To</Label>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Date</Label>
                  <Input
                    id="datetime"
                    type="date"
                    placeholder="this is my description"
                  />
                </div>

                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Time</Label>
                    <Input
                      id="datetime"
                      type="time"
                      placeholder="this is my description"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
