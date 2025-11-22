'use client';

import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Link,
} from '@react-pdf/renderer';
import type { Resume } from '@/lib/types/resume';
import { renderHtmlToPdf } from '@/lib/pdf-render-utils';

const styles = StyleSheet.create({
  // Rich text styles
  paragraph: {
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
  },
  // Header
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 9,
    color: '#666',
  },
  contactItem: {
    marginHorizontal: 5,
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
  // Sections
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
  },
  // Experience & Education
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemSubTitle: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  itemDate: {
    color: '#666',
  },
  // Bullets
  bullet: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bulletPoint: {
    marginRight: 5,
  },
  bulletText: {
    flex: 1,
  },
  // Skills
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCategory: {
    width: '100%',
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 8,
  },
  skill: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '3 6',
    borderRadius: 4,
    margin: 2,
    fontSize: 9,
  }
});

// Register fonts - using standard Helvetica for compatibility
// In a real app, you might register custom fonts like Inter
// Font.register({
//   family: 'Helvetica',
//   fonts: [
//     { src: 'https://fonts.gstatic.com/s/helvetica/v11/KFOmCnqEu92Fr1Me5g.ttf', fontWeight: 'normal' },
//     { src: 'https://fonts.gstatic.com/s/helvetica/v11/KFOnCnqEu92Fr1Me5g.ttf', fontWeight: 'bold' },
//     { src: 'https://fonts.gstatic.com/s/helvetica/v11/KFOmCnqEu92Fr1Me5g.ttf', fontStyle: 'italic' },
//   ],
// });

// Font.register({
//   family: 'Open Sans',
//   src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf'
// });

export const ProfessionalTemplate = React.memo(function ProfessionalTemplate({ resume }: { resume: Resume }) {
  if (!resume) return null;

  const { profile, sections, settings } = resume;
  const { experience, education, skills, projects } = sections;
  const fontFamily = settings?.fontFamily || 'Helvetica';
  const accentColor = settings?.accentColor || '#000000'; // Using accentColor instead of themeColor

  const dynamicSectionTitle = {
    ...styles.sectionTitle,
    color: accentColor,
    borderBottomColor: accentColor,
  };

  return (
    <Document>
      <Page size="A4" style={{ ...styles.page, fontFamily }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={{ ...styles.name, color: accentColor }}>{profile?.name || 'Your Name'}</Text>
          <Text style={styles.title}>{profile?.title || 'Job Title'}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{profile?.email}</Text>
            {profile?.phone && <Text style={styles.contactItem}>|   {profile.phone}</Text>}
            {profile?.location && <Text style={styles.contactItem}>|   {profile.location}</Text>}
            {profile?.url && <Link src={profile.url} style={styles.link}>|   Portfolio</Link>}
          </View>
        </View>

        {/* Summary */}
        {profile?.summary && (
          <View style={styles.section}>
            <Text style={dynamicSectionTitle}>Summary</Text>
            {renderHtmlToPdf(profile.summary, styles)}
          </View>
        )}

        {/* Experience */}
        {Array.isArray(experience) && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicSectionTitle}>Experience</Text>
            {experience.map((job) => {
              if (!job || !job.id) return null;
              return (
                <View key={job.id} style={{ marginBottom: 10 }}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{job.company || 'Company'}</Text>
                    <Text style={styles.itemDate}>{job.startDate || ''} - {job.endDate || 'Present'}</Text>
                  </View>
                  <Text style={styles.itemSubTitle}>{job.position || 'Position'}</Text>
                  {job.description && renderHtmlToPdf(job.description, styles)}
                </View>
              );
            })}
          </View>
        )}
        
        {/* Education */}
        {Array.isArray(education) && education.length > 0 && (
          <View style={styles.section}>
            <Text style={dynamicSectionTitle}>Education</Text>
            {education.map((edu) => {
              if (!edu || !edu.id) return null;
              return (
                <View key={edu.id} style={{ marginBottom: 10 }}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.institution || 'Institution'}</Text>
                    <Text style={styles.itemDate}>{edu.startDate || ''} - {edu.endDate || 'Present'}</Text>
                  </View>
                  <Text style={styles.itemSubTitle}>{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field'}</Text>
                  {edu.description && renderHtmlToPdf(edu.description, styles)}
                </View>
              );
            })}
          </View>
        )}

        {/* Skills */}
        {Array.isArray(skills) && skills.length > 0 && (
            <View style={styles.section}>
                <Text style={dynamicSectionTitle}>Skills</Text>
                <View style={styles.skillsContainer}>
                    {skills.map((skill) => { // Changed skillCat to skill
                      if (!skill || !skill.id) return null;
                      return (
                        <Text key={skill.id} style={styles.skill}>{skill.name || ''} {skill.level && `(${skill.level})`}</Text>
                      );
                    })}
                </View>
            </View>
        )}

        {/* Projects */}
        {Array.isArray(projects) && projects.length > 0 && (
            <View style={styles.section}>
                <Text style={dynamicSectionTitle}>Projects</Text>
                {projects.map((proj) => {
                  if (!proj || !proj.id) return null;
                  return (
                    <View key={proj.id} style={{ marginBottom: 10 }}>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemTitle}>{proj.name || 'Project'}</Text>
                        </View>
                        {proj.description && renderHtmlToPdf(proj.description, styles)}
                    </View>
                  );
                })}
            </View>
        )}

      </Page>
    </Document>
  );
});
