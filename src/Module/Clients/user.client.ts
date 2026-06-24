import { db } from "../../config/database";
import type { CreateUserDTO } from "../global.types";

export class UserClient {

  static create(data: CreateUserDTO) {
      // 1. Use standard '?' placeholders for accounts
      const insertQuery = db.prepare(`INSERT INTO accounts (email, password) VALUES (?, ?)`)
      const accountResult = insertQuery.run(data.email, data.password)
  
      const accountId = accountResult.lastInsertRowid as number
  
      // 2. Use standard '?' placeholders for profiles
      const insertProfile = db.prepare(`
        INSERT INTO profiles (account_id, nik, full_name, role, rt, rw, phone_number, is_lansia)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `)
  
      insertProfile.run(
        accountId,
        data.nik,
        data.fullName,
        data.role,
        data.rt ?? null,
        data.rw ?? null,
        data.phoneNumber ?? null,
        data.isLansia
      )
  
      return { accountId }
  }
  
  static findAccountByEmail(email: string) {
      const query = db.prepare("SELECT id, email FROM accounts WHERE email = ?");
      return query.get(email);
    }
  
  static findProfileByNik(nik: string) {
      const query = db.prepare("SELECT id, nik FROM profiles WHERE nik = ?");
      return query.get(nik);
  }

  static findById(id: number) {
    const query = db.prepare(`
      SELECT 
        a.id, 
        a.email, 
        p.nik, 
        p.full_name AS fullName, 
        p.role, 
        p.rt, 
        p.rw, 
        p.phone_number AS phoneNumber, 
        p.is_lansia AS isLansia
      FROM accounts a
      JOIN profiles p ON a.id = p.account_id
      WHERE a.id = ?
    `);
    
    return query.get(id) as any;
  }
}