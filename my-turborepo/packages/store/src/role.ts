"use client"
import { atom } from 'recoil';
import { UserRole } from "./types";

export const userRoleState = atom({
    key: 'userRoleState', 
    default: UserRole.USER.toString(), 
  });