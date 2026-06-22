# 🗄️ Dokumentasi Arsitektur Database (SQLite)

Dokumentasi ini menjelaskan struktur tabel, relasi, dan aturan data (*constraints*) yang diterapkan langsung pada mesin database aplikasi Management Warga.

---

## 🗺️ Hubungan Relasi Data (1-to-1 Relationship)

Sistem ini memisahkan entitas kredensial akun dengan informasi personal warga demi keamanan dan fleksibilitas data. Hubungan antara tabel `accounts` dan `profiles` adalah **One-to-One (1-to-1)**.

```text
  [ accounts ]                 [ profiles ]
  ------------                 ------------
  id (PK)      <--- 1 : 1 --->  id (PK)
  email (Unique)                account_id (FK -> accounts.id, Unique)
  password                      nik (Unique)
                                full_name
                                role (warga/admin_rt/admin_rw)
                                rt / rw
                                phone_number (Nullable)
                                is_lansia (0/1)