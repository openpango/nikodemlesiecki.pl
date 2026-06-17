import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 11, color: '#333', lineHeight: 1.5 },
  header: { marginBottom: 20, borderBottom: '1 solid #ccc', paddingBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  contact: { fontSize: 10, color: '#666', marginBottom: 2 },
  section: { marginTop: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1 solid #eee', paddingBottom: 5, marginBottom: 10 },
  jobBlock: { marginBottom: 15 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  jobTitle: { fontWeight: 'bold', fontSize: 12 },
  jobPeriod: { fontSize: 10, color: '#666' },
  jobCompany: { fontStyle: 'italic', marginBottom: 5 },
  bullet: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { width: 10, fontSize: 10 },
  bulletText: { flex: 1 },
  skills: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  skillCategory: { fontWeight: 'bold', marginTop: 5, marginBottom: 2 },
});

const ResumeDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>Nikodem Lesiecki</Text>
        <Text style={styles.contact}>nlesiecki@icloud.com • https://github.com/openpango</Text>
        <Text style={styles.contact}>Poland • Creative Technologist & AI Agent Builder</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text>My name is Nikodem, but everyone calls me Nico. I am 22, from Poland, and I have gone from designing pixels to building AI agents — and I am not slowing down. What sets me apart is my creativity, hard work, and adaptability. I love solving complex problems, especially the ones that seem impossible at first. I bring fresh energy and creative-logical thinking to any team.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        
        <View style={styles.jobBlock}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>Freelance / Personal Projects (AI & Web)</Text>
            <Text style={styles.jobPeriod}>07.2023 – Present</Text>
          </View>
          <Text style={styles.jobCompany}>Remote</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Web Development (HTML/CSS/Figma): Designed and coded a custom responsive portfolio website from scratch.</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>AI & Prompt Engineering: Created advanced scripts and prompts for LLMs, automating generation and analysis of large data blocks.</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Agentic Workflows: Designed and implemented multi-stage business automations integrating various tools via API using autonomous AI agents.</Text>
          </View>
        </View>

        <View style={styles.jobBlock}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>Intern / IT & Web Support</Text>
            <Text style={styles.jobPeriod}>09.2020 – 06.2023</Text>
          </View>
          <Text style={styles.jobCompany}>Hubert Krauze • Kalisz / Wrocław</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>AD and M365 Administration: Managed identities, permissions, and user accounts.</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>IT Support (Hardware / LAN Networks): Resolved hardware and system issues on Windows workstations.</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>Web & UI: Maintained website, designed new UI elements, implemented RWD fixes.</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        <View style={styles.jobBlock}>
          <Text style={styles.jobTitle}>MacOSENSE (2024)</Text>
          <Text>A native, external, read-only ESP and combat assistant for Counter-Strike 2 running on macOS via Wine/CrossOver/Whisky. Leverages macOS native Mach kernel APIs to read process memory without injecting DLLs, making it inherently stealthy and undetectable by VAC.</Text>
          <Text style={{ marginTop: 2, fontSize: 10, color: '#666' }}>Technologies: macOS, C, Mach Kernel APIs, Wine, CrossOver</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.jobBlock}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>IT Technician</Text>
            <Text style={styles.jobPeriod}>09.2020 – 06.2023</Text>
          </View>
          <Text style={styles.jobCompany}>TEB Edukacja Technical School • Kalisz</Text>
          <Text style={{ fontSize: 10 }}>Completed 3rd-year level, passed the State Vocational Examination. Qualification: INF.02 (System Administration and Web Technologies).</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.skillCategory}>AI & Automation</Text>
        <Text>AI Coding (Vibe Coding), Prompt Engineering, Building AI Agents, Bypassing AI Restrictions, Agentic Workflow Design</Text>
        
        <Text style={styles.skillCategory}>Design</Text>
        <Text>Figma, UI/UX Design, Graphic Design, Responsive Design</Text>
        
        <Text style={styles.skillCategory}>Frontend</Text>
        <Text>HTML/CSS, React, Next.js, Web Performance Optimization</Text>
      </View>
    </Page>
  </Document>
);

export async function GET() {
  const stream = await renderToStream(<ResumeDocument />);
  
  return new NextResponse(stream as unknown as ReadableStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume-nikodem-lesiecki.pdf"',
    },
  });
}
