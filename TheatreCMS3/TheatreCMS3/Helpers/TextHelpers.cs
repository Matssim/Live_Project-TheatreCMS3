using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TheatreCMS3.Helpers
{
    public class TextHelpers
    {
        public static string CharacterLimit(string content, int numbOfCharacters)
        {
            var truncated = content.Substring(0, numbOfCharacters) + "...";
            return truncated;
        }
    }
}