var varListMaster = {
	"longChart":{
		"chartType":"long-bar-chart",
		"chartTitle":"Multifamily, commercial, and industrial lending volume per capita, 2011–16",
		"sectionTitle":"Citywide trends",
		"notes":"<b>Note:</b> Volume in constant 2016 dollars.",
		"sources":"<b>Sources:</b> 2011–16 CoreLogic data and 2012–16 American Community Survey data.",
		"id":0
	},
	"capFlowRate":{
		"chartType":"hor-bar-chart",
		"chartTitle":"Capital flows per household by neighborhood characteristics, 2011–16",
		"sectionTitle":"Summary of capital flows by race and poverty",
		"notes":"<b>Notes:</b> High-poverty neighborhoods have a poverty rate higher than 25 percent, and low-poverty neighborhoods have a poverty rate of 25 percent or lower. Capital flows in constant 2016 dollars.",
		"sources":"<b>Sources:</b> 2011–16 CoreLogic data; 2012–16 American Community Survey data; 2011–16 Baltimore City Planning Department Capital Improvement Plans; 2011–15 US Department of Housing and Urban Development data; 2011–16 Maryland Department of Education data; 2011–15 Baltimore City Department of Finance data; and 2011–16 Community Reinvestment Act Federal Financial Institutions Examination Council reporting.",
		"id":3
	},
	"loanChart":{
		"chartType":"hor-bar-chart",
		"chartTitle":"Single-family lending volume per owner-occupied housing unit, 2011–16",
		"sectionTitle":"Loans to owner occupants by neighborhood characteristics",
		"notes":"<b>Note:</b> Volume in constant 2016 dollars.",
		"sources":"<b>Sources:</b> 2011–16 CoreLogic data and 2012–16 American Community Survey data.",
		"id":7
	},
	"tripleChart1":{
		"chartType":"hor-bar-chart",
		"chartTitle":"Federal HOME and CDBG investment per household, 2011–16",
		"sectionTitle":"HOME and CDBG investments by neighborhood characteristics",
		"notes":"<b>Notes:</b> Investment in constant 2016 dollars. Census tracts are high poverty if more than 25 percent of households are below the federal poverty level and are low poverty if less than 25 percent of households are below the federal poverty level. CDBG = Community Development Block Grant Program; HOME = HOME Investment Partnerships Program.",
		"sources":"<b>Sources:</b> 2012–16 American Community Survey data and US Department of Housing and Urban Development data.",
		"id":11
	},	
	"tripleChart2":{
		"chartType":"hor-bar-chart",
		"chartTitle":"Baltimore Capital Improvement Program financing per household, 2011–16",
		"sectionTitle":"Capital Improvement investment by neighborhood characteristics",
		"notes":"<b>Notes:</b> Financing in constant 2016 dollars. Census tracts are high poverty if more than 25 percent of households are below the federal poverty level and are low poverty if less than 25 percent of households are below the federal poverty level. CDBG = Community Development Block Grant Program; HOME = HOME Investment Partnerships Program.",
		"sources":"<b>Sources:</b> 2012–16 American Community Survey data and Baltimore City Planning Department data.",
		"id":12
	},	
	"investmentShareChart":{
		"chartType":"stacked-bar-chart",
		"chartTitle":"Baltimore investment share by type, 2011–16",
		"sectionTitle":"Mission and public funding as a share of all investment",
		"notes":"<b>Note:</b> Investment in constant 2016 dollars.",
		"sources":"<b>Sources:</b> Baltimore City Planning Department; US Department of Housing and Urban Development; Maryland Department of Education; CoreLogic; CDFI Fund.",
		"id":14
	},
	"raceMap":{
		"chartType":"dot-map",
		"chartTitle":"Population distribution of residents by race or ethnicity",
		"sectionTitle":"Race in Baltimore",
		"notes":"<b>Notes:</b> Each dot represents 200 residents. AAPI = Asian American and Pacific Islander.",
		"sources":"<b>Source:</b> 2012–16 American Community Survey data.",
		"id":1
	},
	"povrate":{
		"range":[0.01675042,0.114,0.197,0.269,0.354,1],
		"chartType":"poly-map",
		"chartTitle":"Poverty rate by tract",
		"sectionTitle":"Poverty in Baltimore",
		"notes":"",
		"sources":"<b>Source:</b> 2012–16 American Community Survey data.",
		"id":2
	},
	"permit_hh":{
		"range":[294.3623962,3766,7227,17287,41543,446386],
		"chartType":"poly-map",
		"chartTitle":"Construction, rehab, and demolition volume per household, 2011–16",
		"sectionTitle":"Investment in building construction, rehab, and demolition",
		"notes":"<b>Note:</b> Volume in constant 2016 dollars.",
		"sources":"<b>Sources:</b> 2011–16 Baltimore housing data via Open Baltimore and 2012–16 American Community Survey data.",
		"id":4
	},
	"sales_hh":{
		"range":[568.6334839,7299,13837,24157,51330,248426],
		"chartType":"poly-map",
		"chartTitle":"Residential, commercial, and industrial real estate sales per household, 2011–16",
		"sectionTitle":"Real estate sales",
		"notes":"<b>Notes:</b> Residential, commercial, and industrial real estate sales per household, 2011–16. Sales in constant 2016 dollars.",
		"sources":"<b>Sources:</b> 2011–16 CoreLogic data and 2012–16 American Community Survey data.",
		"id":5
	},	
	"res_hh":{
		"range":[0,12422,24877,39472,74426,277759],
		"chartType":"poly-map",
		"chartTitle":"Loan volume to single- and multifamily dwellings per household, 2011–16",
		"sectionTitle":"Loans to single- and multifamily dwellings",
		"notes":"<b>Note:</b> Volume in constant 2016 dollars.",
		"sources":"<b>Sources:</b> 2011–16 CoreLogic data and 2012–16 American Community Survey data.",
		"id":6
	},
	"comm_hh":{
		"range":[0,838,3357,8912,24804,419182],
		"chartType":"poly-map",
		"chartTitle":"Commercial real estate lending volume per household, 2011–15",
		"sectionTitle":"Commercial real estate lending",
		"notes":"<b>Note:</b> Volume in constant 2016 dollars.",
		"sources":"<b>Sources:</b> 2011–16 CoreLogic data and 2012–16 American Community Survey data.",
		"id":8
	},
	"CRA_hh":{
		"range":[8,81,199,474,1287,10670],
		"chartType":"poly-map",
		"chartTitle":"CRA small business lending volume per household, 2011–16",
		"sectionTitle":"Small business lending",
		"notes":"<b>Notes:</b> CRA = Community Reinvestment Act. Volume in constant 2016 dollars.",
		"sources":"<b>Source:</b> 2011–16 CRA Federal Financial Institutions Examination Council reporting.",
		"id":9
	},
	"pub_hh":{
		"range":[0,12,425,1164,3111,150313],
		"chartType":"poly-map",
		"chartTitle":"Public-sector investment per household, 2011–16",
		"sectionTitle":"Public-sector investment",
		"notes":"<b>Note:</b> Investment in constant 2016 dollars.",
		"sources":"<b>Sources:</b> 2012–16 American Community Survey data; 2011–16 Baltimore City Planning Department Capital Improvement Plans; 2011–15 US Department of Housing and Urban Development data; 2011–16 Maryland Department of Education data; US Department of the Treasury’s Community Development Financial Institutions Fund Transaction Level Report database; and Opportunity Finance Network.",
		"id":10
	},
	"miss_hh":{
		"range":[0,1079,1800,3151,4324,115561],
		"chartType":"poly-map",
		"chartTitle":"Aggregate mission lending volume per household, 2011–16",
		"sectionTitle":"Mission lending",
		"notes":"<b>Note:</b> Volume in constant 2016 dollars.",
		"sources":"<b>Sources:</b> 2011–16 CoreLogic data; 2012–16 American Community Survey data; US Department of the Treasury’s Community Development Financial Institutions Fund Transaction Level Report database; and Opportunity Finance Network.",
		"id":13
	}
}; 