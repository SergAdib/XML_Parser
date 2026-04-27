using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Globalization;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace XML_Parser.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ParseDataController : ControllerBase
    {
        public class TextInput
        {
            [JsonProperty("text")]
            required public string text { get; set; }
        }

        public class Cost
        {
            [XmlAttribute("description")]
            [JsonProperty("description")]
            public string? Description { get; set; }
            [XmlAttribute("vendor")]
            [JsonProperty("vendor")]
            public string? Vendor { get; set; }
            [XmlAttribute("date")]
            [JsonProperty("date")]
            public string? Date { get; set; }

            [XmlAttribute("cost_centre")]
            [JsonProperty("costCentre")]
            public string? Cost_Centre { get; set; } = "UNKNOWN";
            [XmlAttribute("payment_method")]
            [JsonProperty("paymentMethod")]
            public string? Payment_Method { get; set; }

            [XmlAttribute("total")]
            [JsonProperty("total")]
            required public double Total { get; set; }
            required public double Price { get; set; }
            required public double Gst { get; set; }            
        }

        public class DataError
        {
            [JsonProperty("error")]
            public Boolean error { get; set; } = true;

            [JsonProperty("msg")]
            public string? msg { get; set; } = "Generic error";
        }

        [HttpGet]
        protected void IterateDoc(Cost cost, XElement element)
        {
            if (element.HasElements)
            {
                foreach (XElement child in element.Elements())
                {
                    IterateDoc(cost, child);
                }
            }
            else
            {
                TextInfo textInfo = CultureInfo.CurrentCulture.TextInfo;
                string tagName = textInfo.ToTitleCase(element.Name.LocalName);
                var value = element.Value;

                PropertyInfo tagInfo = cost.GetType().GetProperty(tagName);
                if (tagInfo != null)
                {
                    if (tagName == "Total")
                    {
                        if (double.TryParse(value, out double total))
                        {
                            tagInfo.SetValue(cost, total);
                        }
                    }
                    else
                    {
                        tagInfo.SetValue(cost, value);
                    }
                }
            }
        }

        public IActionResult Get()
        {
            return Ok("This is API for data parsing. Use POST request to provide your data and get it parsed.");
        }
                
        [HttpPost]
        [Consumes("application/json")]
        public IActionResult Post([FromBody] TextInput request)
        {            
            if (request == null || request.text == null)
            {
                return Ok(new DataError { msg = "No text input provided." });
            }

            string text = Regex.Replace(request.text, @"\\t|\\n|\r|\n", " ");
            int openTagsNumber = Regex.Matches(text, @"<[a-zA-Z]+[^>]*>").Count;
            int closeTagsNumber = Regex.Matches(text, @"</[a-zA-Z][^>]*>").Count;

            if (openTagsNumber != closeTagsNumber)
            {
                string missing = (openTagsNumber > closeTagsNumber) ? "closing" : "opening";
                return Ok(new DataError { msg = $"XML fragment malformed or corrupted: you're missing {missing} tag" });
            }

            var cost = new Cost
            {
                Gst = 0,
                Total = 0,
                Price = 0
            };
            
            // Note:: Get XML-like syntax from text
            string pattern = "<(?<tag>\\w+).*?>.*?</\\k<tag>>";
            foreach (Match xml in Regex.Matches(text, pattern))
            {
                if (xml == null || string.IsNullOrEmpty(xml.Value))
                {                    
                    return Ok(new DataError { msg = "No XML data provided." });
                }

                XDocument doc;
                try
                {
                    doc = XDocument.Parse(xml.Value);                    
                    if (doc != null && doc.Root != null)
                    {
                        IterateDoc(cost, doc.Root);
                    }
                }
                catch (System.Exception ex)
                {
                    // Note:: Throw exception if XML is not valid
                    return Ok(new DataError { msg = $"XML fragment malformed or corrupted: {ex.Message}" });
                }
            }
            if (cost.Total > 0.0)
            {
                cost.Gst = cost.Total / 100 * 15;
                cost.Price = cost.Total - cost.Gst;
            } else
            {
                // Note:: Throw exception if Total missed
                return Ok(new DataError { msg = "Total cost missed in request" });
            }
            
            return Ok(cost);
        }
    }
}
