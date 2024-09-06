"use client"
import { atom } from 'recoil';
import { UserRole } from "@prisma/client";

export const userRoleState = atom({
    key: 'userRoleState', 
    default: UserRole.USER.toString(), 
  });