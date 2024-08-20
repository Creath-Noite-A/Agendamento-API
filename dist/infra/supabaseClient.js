"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = 'https://qreniqtdziaelixjadbg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZW5pcXRkemlhZWxpeGphZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwMjkwMjEsImV4cCI6MjAzOTYwNTAyMX0.UBY3nKc39v-ppFzAX8OHBN_L6huPLRT4GjrD3zOm2Gw';
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
