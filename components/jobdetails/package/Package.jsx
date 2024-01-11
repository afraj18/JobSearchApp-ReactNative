import { View, Text, TouchableOpacity, Linking } from "react-native";
import styles from "./package.style";

const Package = ({ data }) => {
  const handlePress = ({ link }) => {
    console.log(link);
    if (link !== undefined) {
      let linkString = JSON.stringify(link);
      Linking.openURL(linkString);
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Package Related Details : </Text>
      <View style={styles.contentBox}>
        <Text style={styles.contextText}>
          Job Employment Type : {data.job_employment_type}
        </Text>
        <Text style={styles.contextText}>
          Job Apply Quality Score : {data.job_apply_quality_score}
        </Text>
        <Text style={styles.contextText}>
          Job Publisher : {data.job_publisher}
        </Text>

        <Text style={styles.contextText}>
          Does Degree Required:
          {data.job_required_education.degree_preferred
            ? "Requires a bachelor degree"
            : data.job_required_education.associates_degree
            ? "Requires an associate degree"
            : "Not Preffered"}
        </Text>
        <Text style={styles.contextText}>
          Required Experience:
          {data.job_required_experience.required_experience_in_months ??
            "No data"}{" "}
          Months
        </Text>
        <Text style={styles.contextText}>
          Job Apply Link:
          <TouchableOpacity
            onPress={handlePress(JSON.stringify(data.job_apply_link))}
          >
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              {" "}
              {data.job_apply_link}
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Package;
