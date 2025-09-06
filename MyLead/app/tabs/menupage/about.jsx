import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Color';
import { useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import ImageViewing from "react-native-image-viewing";

export default function About() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Section refs
  const sectionsRef = {
    Developers: useRef(null),
    NCMF: useRef(null),
    "Secretary’s Corner": useRef(null),
    "Key Officials": useRef(null),
    "Vision & Mission": useRef(null),
    "Powers & Functions": useRef(null),
    "Organizational Structure": useRef(null),
    "NCMF Quality Policy": useRef(null),
  };

  const [selectedSection, setSelectedSection] = useState("");

  // ✅ Scroll with offset
  const scrollToSection = (section) => {
    if (sectionsRef[section]?.current && scrollViewRef.current) {
      sectionsRef[section].current.measure((x, y, width, height, pageX, pageY) => {
        const OFFSET = 100; 
        scrollViewRef.current.scrollTo({ y: pageY - OFFSET, animated: true });
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      {/* Dropdown */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedSection}
          onValueChange={(itemValue) => {
            setSelectedSection(itemValue);
            if (itemValue) scrollToSection(itemValue);
          }}
        >
          <Picker.Item label="Jump to Section..." value="" />
          {Object.keys(sectionsRef).map((sec) => (
            <Picker.Item key={sec} label={sec} value={sec} />
          ))}
        </Picker>
      </View>

      {/* Scrollable Content */}
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContent}>

        {/* Developers */}
        <View ref={sectionsRef.Developers} style={styles.section}>
          <Text style={styles.sectionTitle}>The Developers</Text>
          <Text style={styles.paragraph}>
            This app was created to assist the Muslim Filipino community by providing 
            information on halal restaurants, services, and cultural resources. 
            It is guided by the mission of inclusivity and accessibility.
          </Text>
        </View>

        {/* NCMF */}
        <View ref={sectionsRef.NCMF} style={styles.section}>
          <Text style={styles.sectionTitle}>The National Commission on Muslim Filipinos (NCMF)</Text>
          <Text style={styles.paragraph}>
            With the signing of Republic Act 9997 (otherwise known as the Act Creating the National 
            Commission on Muslim Filipinos) on February 18, 2010, the government re-affirmed its belief 
            in the importance of the active participation of Muslim Filipinos in nation building, with 
            due regard for their beliefs, customs, traditions, institutions, and aspirations.
          </Text>

          <Text style={styles.paragraph}>
            In brief, the Commission shall serve the following functions:
            {'\n\n'}
            1. Advise the President in the formulation, coordination, implementation, and monitoring 
            of policies, plans, programs, and projects affecting Muslim Filipino communities.
            {'\n\n'}
            2. Act as the primary government agency through which Muslim Filipinos may seek assistance 
            and redress, and serve as a medium through which government aid can be extended.
            {'\n\n'}
            3. Monitor and evaluate the performance of existing policies and programs that aim to 
            strengthen and uplift the socio-economic conditions of Muslim Filipinos, identifying 
            areas needing intervention and support.
            {'\n\n'}
            4. Provide legal and technical services for the survey, adjudication, titling, and development 
            of ancestral lands and settlements, issuing certificates of ancestral land/domain titles.
            {'\n\n'}
            5. Undertake studies, establish and maintain ethnographic research centers and museums on 
            the culture and institutions of Muslim Filipinos to preserve their historical heritage.
          </Text>

          <Text style={styles.paragraph}>
            The NCMF is composed of nine commissioners including the Secretary/Chief Executive Officer, 
            who represents the Commission at cabinet-level meetings with the President. It addresses both 
            local and national concerns of Muslim Filipinos, including the implementation of economic, 
            educational, cultural, and infrastructure programs.
          </Text>

          <Text style={styles.paragraph}>
            Among its main programs are the coordination of the annual Hajj pilgrimage to Makkah, 
            participation in international Qur’an reading competitions, and support for Muslim 
            students studying abroad through authentication of academic documents.
          </Text>

          <Text style={styles.paragraph}>
            Senator Juan Miguel Zubiri, the principal sponsor of RA 9997, emphasized that the 
            creation of the Commission is in consonance with national unity and development. 
            Congressman Dimaporo also underscored its role in ensuring delivery of resources 
            for education, economic, and cultural development programs for Muslims.
          </Text>

          {/* Link */}
          <TouchableOpacity
            onPress={() => Linking.openURL('https://ncmf.gov.ph/')}
            style={styles.linkContainer}
          >
            <Ionicons name="link-outline" size={16} color="#2eaf66" />
            <Text style={styles.linkText}>https://ncmf.gov.ph/</Text>
          </TouchableOpacity>
        </View>

        {/* Secretary’s Corner */}
        <View ref={sectionsRef["Secretary’s Corner"]} style={styles.section}>
          <Text style={styles.sectionTitle}>Secretary’s Corner</Text>
          {/* ✅ Secretary Image */}
          <View style={{ alignItems: "center", marginBottom: 15 }}>
            <Image
              source={require("./../../../assets/images/1789.jpg")}
              style={{ width: 180, height: 180, borderRadius: 10 }}
            />
          </View>

          <Text style={styles.paragraph}>
            Secretary Sheikh Sabuddin N. Abdurahim, PhD, born on March 4, 1966, in Bongao, Tawi-Tawi, 
            is a seasoned Filipino legislator and public servant. He served three terms in the 
            Sangguniang Panlalawigan of Tawi-Tawi (2016-2024), holding various leadership roles such as 
            Chair of the Committees on Business, Trade and Investment, Infrastructure, and Budget and 
            Appropriation, as well as Vice Chair of the Committees on Health and Education. Prior to his 
            legislative career, Secretary Sabuddin worked as a Medical Technologist at the Integrated 
            Provincial Health Office (IPHO) in Bongao, Tawi-Tawi, for 21 years, from 1991 to 2012.
    
            {"\n\n"}He is the author and sponsor of over a hundred ordinances and resolutions, demonstrating 
            his commitment to improving governance. Outside of his legislative work, Sheikh Sabuddin is a 
            distinguished accredited Murshid (Sheikh) of the National Commission on Muslim Filipinos (NCMF), 
            where he has served for 24 years, overseeing the highest number of pilgrims in the ZAMBASULTA region.
    
            {"\n\n"}Secretary Sabuddin completed a Master’s degree in Public Administration from Mindanao State 
            University, Tawi-Tawi, a Bachelor of Science in Medical Technology from Centro Escolar University, 
            Manila, and he has completed the academic requirements for a Ph.D. in Peace and Development.
    
            {"\n\n"}As of March 27, 2024, he serves as the Secretary of the National Commission on Muslim 
            Filipinos, located at the 79 Jocfer Annex Building, Commonwealth Avenue, Diliman, Quezon City. 
            As the current Secretary of the NCMF, Secretary Sabuddin has successfully implemented a highly 
            efficient Hajj operation in the Kingdom of Saudi Arabia, marking it as the most successful in 
            recent years. Under his leadership, there were no significant delays in flights, no issues with 
            services provided to pilgrims, and no concerns regarding financial management. Additionally, 
            Secretary Sabuddin spearheaded the decentralization of the NCMF, which aims to empower regional 
            offices as the implementing arm of the Commission. As a result, the NCMF’s regional offices are in 
            the process of transitioning into fully operational units.
    
            {"\n\n"}His dedication to his community and leadership in various capacities underscores his passion 
            for service and commitment to helping those in need. A testament to his reputation as a trusted 
            public servant, the Bangsamoro Transition Authority issued Resolution No. 446, dated May 20, 2024, 
            supporting his appointment. The resolution acknowledges that the appointment of key officials in the 
            NCMF, including Secretary Sabuddin, is instrumental in ensuring the effective execution of its mandates 
            and the representation of diverse Muslim communities across the nation.
          </Text>

        </View>

        {/* ✅ Key Officials with Images */}
        <View ref={sectionsRef["Key Officials"]} style={styles.section}>
          <Text style={styles.sectionTitle}>Key Officials</Text>

          <View style={styles.official}>
            <TouchableOpacity onPress={() => { setCurrentIndex(0); setVisible(true); }}>
              <Image source={require("./../../../assets/images/1789.jpg")} style={styles.officialImage} />
            </TouchableOpacity>
            <Text style={styles.paragraph}>
              SABUDDIN N. ABDURAHIM{"\n"}Secretary{"\n"}
              (02) 952-48-75 | 952-45-40{"\n"}
              5322-34-00{"\n"}
              sabuddin.abdurahim@yahoo.com | ncmf.osec@gmail.com
            </Text>
          </View>

          <View style={styles.official}>
            <TouchableOpacity onPress={() => { setCurrentIndex(1); setVisible(true); }}>
              <Image source={require("./../../../assets/images/1789.jpg")} style={styles.officialImage} />
            </TouchableOpacity>
            <Text style={styles.paragraph}>
              ATTY. GUILING A. MAMONDIONG{"\n"}Commissioner{"\n"}
              gamamondiong@ncmf.gov.ph
            </Text>
          </View>

          <View style={styles.official}>
            <TouchableOpacity onPress={() => { setCurrentIndex(2); setVisible(true); }}>
              <Image source={require("./../../../assets/images/1789.jpg")} style={styles.officialImage} />
            </TouchableOpacity>
            <Text style={styles.paragraph}>
              ANOTHER OFFICIAL{"\n"}Deputy Commissioner{"\n"}
              deputy@ncmf.gov.ph
            </Text>
          </View>

          {/* Image Viewer */}
          <ImageViewing
            images={[
              require("./../../../assets/images/1789.jpg"),
              require("./../../../assets/images/1789.jpg"),
              require("./../../../assets/images/1789.jpg"),
            ]}
            imageIndex={currentIndex}
            visible={visible}
            onRequestClose={() => setVisible(false)}
          />
        </View>

        {/* Vision & Mission */}
        <View ref={sectionsRef["Vision & Mission"]} style={styles.section}>
          <Text style={styles.sectionTitle}>Vision, Mission, & Core Values</Text>
          <Text style={styles.paragraph}>
            Vision: Resilient Muslim Filipino communities living in dignity as productive 
            and peace-building members of society.{"\n\n"}
            Mission: Preserve and promote Muslim Filipino culture through community 
            empowerment and collaborative governance.{"\n\n"}
            Core Values: God-Centered, Excellence, Teamwork.
          </Text>
        </View>

        {/* Powers & Functions */}
        <View ref={sectionsRef["Powers & Functions"]} style={styles.section}>
          <Text style={styles.sectionTitle}>Powers & Functions</Text>
          <Text style={styles.paragraph}>
            (a) Provide advice and assistance to the President in the formulation, coordination, implementation, and monitoring of policies, plans, programs, and projects affecting Muslim Filipino communities; when so authorized, represent the President on matters concerning Muslim Filipino communities; serve as a link between the President and public or private agencies, internal or external, that are involved in such programs and projects; and recommend such affirmative actions as may be necessary for their efficient and effective implementation;{"\n\n"}
            (b) Undertake and coordinate development programs and projects for the advancement of Muslim Filipino communities, including designing, implementing and maintaining settlements for Muslim Filipino communities, Provided That the Commission shall not take jurisdiction or ownership over lands and bodies of water traditionally and occupied by Indigenous peoples and within the identified ancestral domains of the National Commission on Indigenous Peoples: Provided, further, That lands may be identified by the Commission for the purpose of settling the homeless and displaced Muslim families to improve the conditions of the members of the Muslim communities;{"\n\n"}
            (c) Act as the primary government agency through which Muslim Filipinos can seek government assistance and redress; serve as the medium through which such assistance may be extended to Muslim Filipinos; for this purpose, the Commission is hereby authorized, subject to existing auditing rules and regulations, to give grants-in-aid out of its appropriations or other appropriate funds to cooperating government agencies for such programs or projects for the development of Muslim Filipino communities; provide services including legal assistance, medical aid, relief, rehabilitation and other forms of assistance for socio-economic upliftment of Muslim Filipino communities;{"\n\n"}
            (d) Participate in the peace process involving conflicts between Filipino Muslim groups and/or individuals and the government in cooperation with appropriate agencies, individuals and institutions. Pursuant hereto, the Commission’s Secretary or his/her duly designated representative shall sit as a regular member of the government’s peace panel negotiating peace with the Muslim Filipino groups or individuals;{"\n\n"}
            (e) Enter, subject to existing laws, policies, and guidelines, into contracts, agreements or arrangements with government or private agencies/entities as may be necessary to attain the objectives of the Commission;{"\n\n"}
            (f) In accordance with existing laws, rules and regulations and subject to guidelines provided by the Office of the President, promote and enhance the development of domestic trade and commerce among the members of the Muslim Filipino communities; promote or facilitate the establishment by members of the Muslim Filipino communities joint venture and investments in cooperation or coordination with existing public enterprises, corporations or private entities; initiate and/or organize, in accordance with pertinent laws, rules and regulations, enterprises based on the principles of Islamic business and finance for the benefit and welfare of the Muslim Filipino communities;{"\n\n"}
            (g) Recommend to the Department of Budget and Management (DBM) the proposed expenditure for the development of all Muslim Filipino communities;{"\n\n"}
            (h) Promote and develop the Philippine Halal Industry and accredit halal-certifying entities/bodies for the utmost benefit of Muslim Filipinos and in partnership or cooperation with appropriate agencies, individuals and institutions here and abroad;{"\n\n"}
            (i) Develop criteria for allocating additional resources for education, economic and cultural development programs;{"\n\n"}
            (j) Monitor and evaluate the performance of all existing policies and development programs of the government that seek to strengthen and uplift the socioeconomic conditions of Muslim Filipinos and identify areas that need government intervention and support;{"\n\n"}
            (k) Acquire, lease or own property or assets in whatever form as may be necessary, and sell or otherwise dispose of the same, and serve as the custodian or administrator of such lands or areas and other properties or assets the President may reserve for the benefit of Muslim Filipino communities;{"\n\n"}
            (l) Solicit and accept grants, donations and gifts, in cash or in kind, in whatever source, in coordination with the appropriate agency for the benefit of the Muslim Filipinos, and administer the same in accordance with the terms thereof, or in the absence of any condition, in such manner consistent with the interest of Muslim Filipinos as well as existing laws;{"\n\n"}
            (m) Undertake studies, establish and maintain ethnographic research centers and museums on the cultures and institutions of Muslim Filipinos for policy formulation and program implementation and for the purpose of preserving their historical heritage;{"\n\n"}
            (n) Certify, whenever appropriate, membership of persons in Muslim Filipino communities for purposes of establishing qualifications for specific requirements of government and private agencies or for benefits as may be provided by law;{"\n\n"}
            (o) Provide legal and technical services for the survey, adjudication, titling, and development of Muslim Filipino ancestral lands and settlements proclaimed by the government for the Muslim Filipinos;{"\n\n"}
            (p) Assist the National Statistics Office (NSO) in conducting census on the actual population of Muslim Filipinos in the country;{"\n\n"}
            (q) Administer all programs, projects and activities, formulate the necessary rules and regulations, and coordinate with pertinent offices to ensure the success of the annual Hajj (pilgrimage) to Mecca, Kingdom of Saudi Arabia;{"\n\n"}
            (r) Promote the development of a Hajj Assistance Fund that shall be created from contributions of Muslim Filipinos and other donors which shall be used to support the financial needs of deserving Muslim Filipinos intending to participate in the annual Hajj;{"\n\n"}
            (s) Administer and hold in trust awqaf (endowment) properties and/or awqaf institutions, and receive by way of grant, donations or gifts, awqaf investments in accordance with the principles of Islamic investments and finance;{"\n\n"}
            (t) Prescribe rules and regulations for the establishment of awqaf institutions, administration of awqaf assets, and settlement of disputes among awqaf beneficiaries pursuant to the general principles of Shari’ah (Islamic Law);{"\n\n"}
            (u) Formulate and adopt continuing programs and activities to strengthen Madaris (plural of Madrasah) schools, Islamic Studies, and Shari’ah and Islamic jurisprudence, in coordination with appropriate agencies of the government;{"\n\n"}
            (v) Promote and supervise, in coordination with appropriate agencies of the government, the implementation of the Madrasah education system throughout the country except in the Autonomous Region in Muslim Mindanao (ARMM) where the system shall be implemented and supervised by the Department of Education-ARMM; and provide assistance in the expeditious accreditation of Madrasah educational institutions with the appropriate agencies of the government;{"\n\n"}
            (w) Ensure that the curriculum of the Madrasah education system shall conform with the basic curriculum of the national formal education system which, along with teachings on Arabic Language, Islamic Studies, and Filipino and Islamic Values shall include, among others, the subjects on Filipino and English Grammar and Usage, Philippine History and Geography, Science and Technology, Mathematics, Physical Education and Sports Development, and Vocational Education to secure the local and international competitiveness of Muslim Filipino graduates from the Madrasah educational institutions;{"\n\n"}
            (x) Develop criteria for the grant of local and foreign scholarships and the selection of deserving students and teachers of Madrasah and other educational institutions;{"\n\n"}
            (y) Provide and/or facilitate access to local and foreign scholarships to deserving Muslim Filipinos in coordination with formal educational institutions here and abroad;{"\n\n"}
            (z) Ensure the continuous transfer of technology to Muslim Filipino communities to uplift the quality of life of Muslim Filipinos;{"\n\n"}
            (aa) Promulgate such rules and regulations and exercise such powers and functions as may be necessary to carry out the purposes and objectives outlined in this Act; and{"\n\n"}
            (bb) Perform such other functions as may be necessary for its effective operations and continued enhancement as a government entity.
          </Text>
        </View>

        {/* Organizational Structure */}
        <View ref={sectionsRef["Organizational Structure"]} style={styles.section}>
          <Text style={styles.sectionTitle}>Organizational Structure</Text>
          <Text style={styles.paragraph}>
            The Commission shall be composed of the offices of the Secretary, the Commissioners, the Executive Director and the Deputy Executive Director and their immediate staff, the Bureaus, Services, Regional Offices, Field Offices and Sub-Offices
          </Text>
        </View>

        {/* NCMF Quality Policy */}
        <View ref={sectionsRef["NCMF Quality Policy"]} style={styles.section}>
          <Text style={styles.sectionTitle}>NCMF Quality Policy</Text>
          <Text style={styles.paragraph}>
            (Insert text here)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'poppins-bold',
    position: 'absolute',
    left: 0, right: 0,
  },
  dropdownContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 10,
  },
  scrollContent: { padding: 15 },
  section: { 
    padding: 16, 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    marginBottom: 16 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2eaf66",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'justify',
    flexShrink: 1,
  },
  official: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  officialImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  linkContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  linkText: { marginLeft: 5, fontSize: 14, color: '#2eaf66', textDecorationLine: 'underline' },
});
