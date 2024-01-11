import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";

import {
  JobFooter,
  JobAbout,
  JobTabs,
  Company,
  ScreenHeaderBtn,
  Specifics,
  Package,
} from "../../components";

import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";
import { useCallback, useState } from "react";

const tabs = ["About", "Qualifications", "Responsibilities", "Package"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No Data Provided"} />
        );
        break;
      case "Package":
        return <Package data={data[0]} />;
        break;
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
        break;
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
        break;

      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              handlePress={() => router.back()}
              dimensions="60%"
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimensions="60%" />
          ),
          headerTitle: "Job Details",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
