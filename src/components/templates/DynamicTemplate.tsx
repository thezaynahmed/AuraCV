import { Page, Text, View, Document, StyleSheet, Link, Styles } from '@react-pdf/renderer';
import { Resume } from '@/lib/types/resume';

interface DynamicTemplateProps {
  resume: Resume;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    lineHeight: 1.5,
    color: '#333',
  },
  section: {
    marginBottom: 15,
  },
});

type StyleType = any;

export const DynamicTemplate = ({ resume }: DynamicTemplateProps) => {
  const { profile = {} as Resume['profile'], sections = {} as Resume['sections'], settings } = resume || {};
  const { fontFamily = 'Helvetica', theme = 'modern', accentColor = '#000000' } = settings || {};

  const isMinimalist = theme === 'minimalist';
  const isModern = theme === 'modern'; // Professional
  const isClassic = theme === 'classic'; // Creative (Sidebar)

  const themeStyles = StyleSheet.create({
    page: {
      fontFamily: fontFamily,
      padding: isClassic ? 0 : 30,
      flexDirection: isClassic ? 'row' : 'column',
      backgroundColor: '#fff',
    },
    header: {
      marginBottom: 20,
      textAlign: isMinimalist ? 'center' : 'left',
      borderBottom: isModern ? `2px solid ${accentColor}` : 'none',
      paddingBottom: isModern ? 10 : 0,
    },
    sidebar: {
       width: '30%',
       backgroundColor: '#f4f4f5',
       padding: 20,
       height: '100%',
    },
    main: {
       width: isClassic ? '70%' : '100%',
       padding: isClassic ? 20 : 0,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isMinimalist ? '#000' : accentColor,
      marginBottom: 5,
      textTransform: isModern ? 'uppercase' : 'none',
    },
    title: {
      fontSize: 14,
      color: '#555',
      marginBottom: 5,
      fontWeight: 'medium',
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 8,
      marginTop: 5,
      color: isMinimalist ? '#000' : accentColor,
      textTransform: 'uppercase',
      borderBottom: isMinimalist ? '1px solid #000' : 'none',
      letterSpacing: 1,
    },
    itemTitle: {
      fontWeight: 'bold',
      fontSize: 11,
    },
    itemSubtitle: {
      fontSize: 10,
      color: '#666',
    },
    text: {
       fontSize: 10,
       marginBottom: 2,
       textAlign: 'justify',
    },
    contactRow: {
       flexDirection: 'row', 
       justifyContent: isMinimalist ? 'center' : 'flex-start', 
       gap: 10, 
       flexWrap: 'wrap', 
       fontSize: 9, 
       marginTop: 5,
       color: '#666'
    }
  });
 
  // Helper components moved inside DynamicTemplate
  const ExperienceSection = ({ sections, themeStyles }: { sections: Resume['sections'], themeStyles: StyleType }) => (
    <View style={styles.section}>
      <Text style={themeStyles.sectionTitle}>Experience</Text>
      {sections.experience?.map((exp) => (
        <View key={exp.id} style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text style={themeStyles.itemTitle}>{exp.position}</Text>
            <Text style={themeStyles.itemSubtitle}>{exp.startDate} - {exp.endDate}</Text>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: 10, marginBottom: 2 }}>{exp.company}, {exp.location}</Text>
          <Text style={themeStyles.text}>{exp.description}</Text>
        </View>
      ))}
    </View>
  );

  const EducationSection = ({ sections, themeStyles }: { sections: Resume['sections'], themeStyles: StyleType }) => (
    <View style={styles.section}>
      <Text style={themeStyles.sectionTitle}>Education</Text>
      {sections.education?.map((edu) => (
        <View key={edu.id} style={{ marginBottom: 8 }}>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={themeStyles.itemTitle}>{edu.institution}</Text>
            <Text style={themeStyles.itemSubtitle}>{edu.startDate} - {edu.endDate}</Text>
          </View>
          <Text style={{ fontSize: 10 }}>{edu.degree} in {edu.fieldOfStudy}</Text>
          <Text style={{ fontSize: 10, color: '#666' }}>{edu.location}</Text>
          {edu.description && <Text style={themeStyles.text}>{edu.description}</Text>}
        </View>
      ))}
    </View>
  );

  const SkillsSection = ({ sections, themeStyles, isMinimalist }: { sections: Resume['sections'], themeStyles: StyleType, isMinimalist: boolean }) => (
     <View style={styles.section}>
        <Text style={themeStyles.sectionTitle}>Skills</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
           {sections.skills?.map((skill) => (
              <Text key={skill.id} style={{ 
                 backgroundColor: isMinimalist ? 'transparent' : '#e4e4e7', 
                 padding: isMinimalist ? 0 : '3 8', 
                 borderRadius: 4,
                 marginRight: 5,
                 marginBottom: 5,
                 fontSize: 9,
                 color: '#333'
              }}>
                 {skill.name} {isMinimalist && '•'}
              </Text>
           ))}
        </View>
     </View>
  );

  const ProjectsSection = ({ sections, themeStyles }: { sections: Resume['sections'], themeStyles: StyleType }) => (
     <View style={styles.section}>
        <Text style={themeStyles.sectionTitle}>Projects</Text>
        {sections.projects?.map((proj) => (
           <View key={proj.id} style={{ marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                 <Text style={themeStyles.itemTitle}>{proj.name}</Text>
                 <Text style={themeStyles.itemSubtitle}>{proj.startDate} - {proj.endDate}</Text>
              </View>
              <Link src={proj.url} style={{ fontSize: 9, marginBottom: 2 }}>{proj.url}</Link>
              <Text style={themeStyles.text}>{proj.description}</Text>
              <Text style={{ fontSize: 9, color: '#666', fontStyle: 'italic' }}>
                 {proj.technologies.join(', ')}
              </Text>
           </View>
        ))}
     </View>
  );

  if (isClassic) {
     return (
        <Document>
           <Page size={settings.documentSize} style={themeStyles.page}>
              <View style={themeStyles.sidebar}>
                 <Text style={themeStyles.name}>{profile.name}</Text>
                 <Text style={themeStyles.title}>{profile.title}</Text>
                 
                 <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ fontSize: 10, marginBottom: 4 }}>{profile.location}</Text>
                    <Text style={{ fontSize: 10, marginBottom: 4 }}>{profile.email}</Text>
                    <Text style={{ fontSize: 10, marginBottom: 4 }}>{profile.phone}</Text>
                    <Link src={profile.url} style={{ fontSize: 10 }}>{profile.url}</Link>
                 </View>
                 
                 <SkillsSection sections={sections} themeStyles={themeStyles} isMinimalist={isMinimalist} />
                 
                 <View style={styles.section}>
                    <Text style={themeStyles.sectionTitle}>Education</Text>
                    {sections.education?.map((edu) => (
                       <View key={edu.id} style={{ marginBottom: 10 }}>
                          <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{edu.institution}</Text>
                          <Text style={{ fontSize: 10 }}>{edu.degree}</Text>
                          <Text style={{ fontSize: 9, color: '#666' }}>{edu.startDate} - {edu.endDate}</Text>
                       </View>
                    ))}
                 </View>
              </View>
              <View style={themeStyles.main}>
                 <View style={styles.section}>
                    <Text style={themeStyles.sectionTitle}>Professional Summary</Text>
                    <Text style={themeStyles.text}>{profile.summary}</Text>
                 </View>
                 <ExperienceSection sections={sections} themeStyles={themeStyles} />
                 <ProjectsSection sections={sections} themeStyles={themeStyles} />
              </View>
           </Page>
        </Document>
     );
  }

  return (
    <Document>
      <Page size={settings.documentSize} style={{ ...styles.page, fontFamily: fontFamily }}>
        <View style={themeStyles.header}>
          <Text style={themeStyles.name}>{profile.name}</Text>
          <Text style={themeStyles.title}>{profile.title}</Text>
          <View style={themeStyles.contactRow}>
             <Text>{profile.location}</Text>
             <Text>|</Text>
             <Text>{profile.email}</Text>
             <Text>|</Text>
             <Text>{profile.phone}</Text>
             <Text>|</Text>
             <Link src={profile.url}>{profile.url}</Link>
          </View>
        </View>

        <View style={styles.section}>
           <Text style={themeStyles.sectionTitle}>Professional Summary</Text>
           <Text style={themeStyles.text}>{profile.summary}</Text>
        </View>

        <ExperienceSection sections={sections} themeStyles={themeStyles} />
        <ProjectsSection sections={sections} themeStyles={themeStyles} />
        <EducationSection sections={sections} themeStyles={themeStyles} />
        <SkillsSection sections={sections} themeStyles={themeStyles} isMinimalist={isMinimalist} />
      </Page>
    </Document>
  );
};

