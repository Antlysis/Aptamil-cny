import nl2br from "react-nl2br";

export const isFeatureFlagged: boolean =
  import.meta.env.VITE_ENV === 'production';


export const TextWithLineBreaks = (text: string) => {
  return nl2br(text);
}
