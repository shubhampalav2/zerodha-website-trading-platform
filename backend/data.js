const stockData = [
    {
        symbol: "TCS",
        companyName: "Tata Consultancy Services",
        exchange: "NSE",
        currentPrice: 3542.50,
        previousClose: 3510.20
    },
    {
        symbol: "INFY",
        companyName: "Infosys",
        exchange: "NSE",
        currentPrice: 1825.75,
        previousClose: 1802.40
    },
    {
        symbol: "RELIANCE",
        companyName: "Reliance Industries",
        exchange: "NSE",
        currentPrice: 2945.30,
        previousClose: 2918.65
    },
    {
        symbol: "HDFCBANK",
        companyName: "HDFC Bank",
        exchange: "NSE",
        currentPrice: 1742.80,
        previousClose: 1718.25
    },
    {
        symbol: "ICICIBANK",
        companyName: "ICICI Bank",
        exchange: "NSE",
        currentPrice: 1285.45,
        previousClose: 1269.80
    },
    {
        symbol: "SBIN",
        companyName: "State Bank of India",
        exchange: "NSE",
        currentPrice: 842.60,
        previousClose: 831.40
    },
    {
        symbol: "BHARTIARTL",
        companyName: "Bharti Airtel",
        exchange: "NSE",
        currentPrice: 1865.20,
        previousClose: 1838.75
    },
    {
        symbol: "ITC",
        companyName: "ITC Limited",
        exchange: "NSE",
        currentPrice: 468.35,
        previousClose: 462.90
    },
    {
        symbol: "HINDUNILVR",
        companyName: "Hindustan Unilever",
        exchange: "NSE",
        currentPrice: 2528.40,
        previousClose: 2502.15
    },
    {
        symbol: "LT",
        companyName: "Larsen & Toubro",
        exchange: "NSE",
        currentPrice: 3685.75,
        previousClose: 3642.30
    },
    {
        symbol: "KOTAKBANK",
        companyName: "Kotak Mahindra Bank",
        exchange: "NSE",
        currentPrice: 1948.60,
        previousClose: 1925.45
    },
    {
        symbol: "AXISBANK",
        companyName: "Axis Bank",
        exchange: "NSE",
        currentPrice: 1168.25,
        previousClose: 1152.70
    },
    {
        symbol: "MARUTI",
        companyName: "Maruti Suzuki India",
        exchange: "NSE",
        currentPrice: 12485.50,
        previousClose: 12360.20
    },
    {
        symbol: "M&M",
        companyName: "Mahindra & Mahindra",
        exchange: "NSE",
        currentPrice: 3125.80,
        previousClose: 3088.40
    },
    {
        symbol: "TATAMOTORS",
        companyName: "Tata Motors",
        exchange: "NSE",
        currentPrice: 768.45,
        previousClose: 755.90
    },
    {
        symbol: "SUNPHARMA",
        companyName: "Sun Pharmaceutical Industries",
        exchange: "NSE",
        currentPrice: 1785.35,
        previousClose: 1762.80
    },
    {
        symbol: "DRREDDY",
        companyName: "Dr. Reddys Laboratories",
        exchange: "NSE",
        currentPrice: 6425.70,
        previousClose: 6378.50
    },
    {
        symbol: "CIPLA",
        companyName: "Cipla",
        exchange: "NSE",
        currentPrice: 1568.25,
        previousClose: 1549.60
    },
    {
        symbol: "ADANIENT",
        companyName: "Adani Enterprises",
        exchange: "NSE",
        currentPrice: 2485.90,
        previousClose: 2452.35
    },
    {
        symbol: "ADANIPORTS",
        companyName: "Adani Ports and Special Economic Zone",
        exchange: "NSE",
        currentPrice: 1428.75,
        previousClose: 1405.20
    },
    {
        symbol: "TITAN",
        companyName: "Titan Company",
        exchange: "NSE",
        currentPrice: 3628.40,
        previousClose: 3592.75
    },
    {
        symbol: "ASIANPAINT",
        companyName: "Asian Paints",
        exchange: "NSE",
        currentPrice: 2895.60,
        previousClose: 2868.40
    },
    {
        symbol: "NESTLEIND",
        companyName: "Nestle India",
        exchange: "NSE",
        currentPrice: 2385.25,
        previousClose: 2362.90
    },
    {
        symbol: "ULTRACEMCO",
        companyName: "UltraTech Cement",
        exchange: "NSE",
        currentPrice: 11985.50,
        previousClose: 11840.25
    },
    {
        symbol: "SUNTV",
        companyName: "Sun TV Network",
        exchange: "NSE",
        currentPrice: 712.35,
        previousClose: 704.80
    },
    {
        symbol: "POWERGRID",
        companyName: "Power Grid Corporation of India",
        exchange: "NSE",
        currentPrice: 338.75,
        previousClose: 332.60
    },
    {
        symbol: "NTPC",
        companyName: "NTPC Limited",
        exchange: "NSE",
        currentPrice: 412.50,
        previousClose: 405.75
    },
    {
        symbol: "COALINDIA",
        companyName: "Coal India",
        exchange: "NSE",
        currentPrice: 482.35,
        previousClose: 475.90
    },
    {
        symbol: "ONGC",
        companyName: "Oil and Natural Gas Corporation",
        exchange: "NSE",
        currentPrice: 286.45,
        previousClose: 281.70
    },
    {
        symbol: "IOC",
        companyName: "Indian Oil Corporation",
        exchange: "NSE",
        currentPrice: 168.80,
        previousClose: 165.95
    },
    {
        symbol: "BPCL",
        companyName: "Bharat Petroleum Corporation",
        exchange: "NSE",
        currentPrice: 394.25,
        previousClose: 388.60
    },
    {
        symbol: "HCLTECH",
        companyName: "HCL Technologies",
        exchange: "NSE",
        currentPrice: 1678.50,
        previousClose: 1655.25
    },
    {
        symbol: "WIPRO",
        companyName: "Wipro",
        exchange: "NSE",
        currentPrice: 548.75,
        previousClose: 540.30
    },
    {
        symbol: "TECHM",
        companyName: "Tech Mahindra",
        exchange: "NSE",
        currentPrice: 1725.40,
        previousClose: 1702.85
    },
    {
        symbol: "LTIM",
        companyName: "LTIMindtree",
        exchange: "NSE",
        currentPrice: 5825.75,
        previousClose: 5758.20
    },
    {
        symbol: "TATASTEEL",
        companyName: "Tata Steel",
        exchange: "NSE",
        currentPrice: 168.45,
        previousClose: 165.80
    },
    {
        symbol: "JSWSTEEL",
        companyName: "JSW Steel",
        exchange: "NSE",
        currentPrice: 1095.60,
        previousClose: 1082.35
    },
    {
        symbol: "HINDALCO",
        companyName: "Hindalco Industries",
        exchange: "NSE",
        currentPrice: 742.85,
        previousClose: 731.40
    },
    {
        symbol: "EICHERMOT",
        companyName: "Eicher Motors",
        exchange: "NSE",
        currentPrice: 5685.30,
        previousClose: 5618.75
    },
    {
        symbol: "HEROMOTOCO",
        companyName: "Hero MotoCorp",
        exchange: "NSE",
        currentPrice: 5125.60,
        previousClose: 5068.40
    },
    {
        symbol: "BAJAJ-AUTO",
        companyName: "Bajaj Auto",
        exchange: "NSE",
        currentPrice: 9825.75,
        previousClose: 9710.30
    },
    {
        symbol: "BAJFINANCE",
        companyName: "Bajaj Finance",
        exchange: "NSE",
        currentPrice: 9850.40,
        previousClose: 9735.65
    },
    {
        symbol: "BAJAJFINSV",
        companyName: "Bajaj Finserv",
        exchange: "NSE",
        currentPrice: 2145.80,
        previousClose: 2118.35
    },
    {
        symbol: "INDUSINDBK",
        companyName: "IndusInd Bank",
        exchange: "NSE",
        currentPrice: 985.25,
        previousClose: 972.80
    },
    {
        symbol: "DIVISLAB",
        companyName: "Divis Laboratories",
        exchange: "NSE",
        currentPrice: 6725.50,
        previousClose: 6658.75
    },
    {
        symbol: "APOLLOHOSP",
        companyName: "Apollo Hospitals Enterprise",
        exchange: "NSE",
        currentPrice: 7358.40,
        previousClose: 7285.20
    },
    {
        symbol: "TRENT",
        companyName: "Trent",
        exchange: "NSE",
        currentPrice: 6855.75,
        previousClose: 6772.40
    },
    {
        symbol: "BEL",
        companyName: "Bharat Electronics",
        exchange: "NSE",
        currentPrice: 378.60,
        previousClose: 371.85
    },
    {
        symbol: "HAL",
        companyName: "Hindustan Aeronautics",
        exchange: "NSE",
        currentPrice: 4825.35,
        previousClose: 4768.90
    },
    {
        symbol: "ZOMATO",
        companyName: "Zomato",
        exchange: "NSE",
        currentPrice: 286.45,
        previousClose: 280.75
    },
    {
        symbol: "PIDILITIND",
        companyName: "Pidilite Industries",
        exchange: "NSE",
        currentPrice: 3185.60,
        previousClose: 3148.25
    }
]

module.exports = stockData;