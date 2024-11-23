import { ReactNode } from "react";

export interface GigsInterface {
    confirmUserId: string;
    id: string;
    title: string;
    content: string;
    startDateTime: Date;
    endDateTime: Date;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    Interval: any; //as it is a JSON vlaue
    status: GigStatus;
    timeneeded: number;
    category : string;
    acceptedUsers : {
      skizzerId : string
    }[];
  }

  export interface Datetimepackage {
    startDATEmonth: string | undefined; //contains start day month
    startDATEday: number; //conatins start date date
    endDATEmonth: string | undefined;
    endDATEday: number;
    sessionTime: string; // will be a String Convert timeneeded into 30min | 45min | 1Hr
    startTime: string; // has start time
    endTime: string;
    timeneeded: number; // this is Duration of the meeting
    startDateTime: Date; //has original Date and Time
    endDateTime: Date;
  }

  export interface AppbarProps {
    user?: {
      name?: string | null;
      photo?: any;
      email?: string | null;
      role?: UserRole;
      userImage?: string | null;
    };
    onSignin: any;
    onSignout: any;
    altname: string;
    fn: any;
    children : ReactNode
  }

  export interface meetingsInfo_interface {
    id: string;
    gigId: string;
    skizzerId: string;
    UserId: string;
    status: GigStatus;
    budget: number;
    finalDateTime: Date;
    user: {
      id: string;
      name: string | null;
      userImage: string | null;
      email: string | null;
    };
    Skizzer: {
      id: string;
      name: string | null;
      userImage: string | null;
      email: string | null;
    };
    gig: {
      title: string;
      content: string;
      timeneeded: number;
      category: string;
    };
  }
  
  export interface GiguserContent {
    id: string,
    gigId: string,
    skizzerId:string,
    UserId:string,
    status: GigStatus,
    budget: number,
    finalDateTime: Date,
    gig: {
        title: string;
        content: string;
        timeneeded : number;
        authorId: string;
    };
    user: {
        name : string | null,
        userImage : string | null
    };
    }


    interface AcceptedUser {
      id: string;
      gigId: string;
      skizzerId: string;
      UserId: string;
      status: string;
      budget: number;
      finalDateTime: Date;
    }
    
    export enum MeetingStatus {
      UNBOOKED_PENDING = "UNBOOKED PENDING",
      BOOKED_PENDING = "BOOKED PENDING",
      ONGOING = "ONGOING", //When the meeting Time is Ongoing Then Before 30 Minutes we will send the Notification
      ENDED = "ENDED"
    }
    
    export enum AuthType {
      GOOGLE = "GOOGLE",
      FACEBOOK = "FACEBOOK",
      GITHUB = "GITHUB",
      PENDING = "PENDING",
      LINKEDIN = "LINKEDIN"
    }
    
    export enum GigStatus {
      PENDING = "PENDING",
      ACCEPTED = "ACCEPTED",
      REJECTED = "REJECTED",
      IGNORED = "IGNORED",
      CONFIRMED = "CONFIRMED"
    }
    
    export enum UserRole {
      USER = "USER",
      SKIZZER = "SKIZZER"
    }
    