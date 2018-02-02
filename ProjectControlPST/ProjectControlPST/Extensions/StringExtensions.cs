using System.Text;

namespace ProjectControlPST.Extensions
{
    public static class StringExtensions
    {
        public static string ToHashtagUrl(this string str)
        {
            return str.ToLower()
                .Replace(" ", "-")
                .RemoveSpecialCharacters();
        }

        public static string RemoveSpecialCharacters(this string str)
        {
            var sb = new StringBuilder();
            foreach (var c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '-')
                    sb.Append(c);
            }
            return sb.ToString();
        }
    }
}