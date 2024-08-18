import Profile from "@/models/Profile";
import connectDB from "@/utils/connectDB";
import DetailsPage from "@/template/DetailsPage";

async function ProfileDetails({ params: { profileId } }) {
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });

  if (!profileId) return <h3>مشکلی پیش آمده است</h3>;

  return <DetailsPage data={profile} />;
}

export default ProfileDetails;

export const generateMetadata = async ({ params: { profileId } }) => {
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });
  return {
    title: profile.title,
    description: profile.description,
    authors: { name: profile.realState },
  };
};
