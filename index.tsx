import React, {useState} from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const SERVER_URL = "https://eclavea-classmanagement.vercel.app/";

export default function Index() {

  const [lastName, setLastName] = useState(``);
  const [firstName, setFirstName] = useState(``);
  const [section, setSection] = useState(``);
  const [status, setStatus] = useState(``);
  const [message, setMessage] = useState(``);

  const [locallastName, setlocalLastName] = useState(``);
  const [localfirstName, setlocalFirstName] = useState(``);
  const [localsection, setlocalSection] = useState(``);
  const [localstatus, setlocalStatus] = useState(``);

  const handlePresent = async ()=> {
  setMessage("Submitting attendance...");
  setlocalLastName(lastName);
  setlocalFirstName(firstName);
  setlocalSection(section);
  setlocalStatus("Present");

    try{
      const response = await fetch(
        SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          lastName:lastName,
          firstName:firstName,
          section:section,
          status: "present",
        }),
        
      });
    }
    catch(error)
    {
      console.error("Failed to submit attendance:", error);
      setMessage("Failed to submit:${error.message}");
    }
  };

  const handleAbsent = async ()=> {
  setMessage("Submitting attendance..."); 
  setlocalStatus("Absent");
  };

  return (
    <View style={styles.outer}>
      <View style={styles.box}>
        {/* Lastname */}
        <View style={styles.row}>
          <Text 
          style={styles.label} >
          Lastname:</Text>
          <TextInput value={lastName} 
          onChangeText={setLastName}
          style={styles.input} 
          placeholder="Enter Last Name"/>
        </View>

        {/* Firstname */}
        <View style={styles.row}>
          <Text 
          style={styles.label}>
          Firstname:</Text>
          <TextInput 
          value={firstName} 
          onChangeText={setFirstName}
          style={styles.input} 
          placeholder="Enter First Name"/>
        </View>

        {/* Section */}
        <View style={styles.row}>
          <Text 
          style={styles.label}
          >Section:</Text>
          <TextInput value={section} 
          onChangeText={setSection}
          style={styles.input} 
          placeholder="Enter Section"/>
        </View>

        <Text>
          {`Lastname: ${locallastName} firstname: ${localfirstName} section: ${localsection} status: ${localstatus}`}
        </Text>

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handlePresent}
           style={[styles.btn, styles.present]}>
            <Text style={styles.btnText}>Present</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAbsent} 
            style={[styles.btn, styles.absent]}>
            <Text style={styles.btnText}>Absent</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#063070ff",
    padding: 20,
  },
  box: {
    width: "90%",
    maxWidth: 350,
    padding: 20,
    backgroundColor: "#00b7ffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    width: 90,
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffffff",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  present: {
    backgroundColor: "#28a745",
  },
  absent: {
    backgroundColor: "#dc3545",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});