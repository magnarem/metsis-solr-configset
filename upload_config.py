#!/usr/bin/env python3
import argparse
import getpass
import io
import os
import zipfile

import requests


def zip_configset_in_memory(source_dir, exclude_files=None):
    """
    Create a ZIP archive of the specified directory in memory, excluding specified files.

    :param source_dir: The directory to compress (files inside this directory will be added flat).
    :param exclude_files: A list of file patterns to exclude.
    :return: A BytesIO object containing the ZIP file data.
    """
    exclude_files = exclude_files or []
    memory_file = io.BytesIO()

    # Create a ZIP archive in memory
    with zipfile.ZipFile(memory_file, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                # Skip excluded files
                if any(file.endswith(pattern) for pattern in exclude_files):
                    continue
                file_path = os.path.join(root, file)
                # Add the file to the ZIP archive, flattening the structure
                arcname = os.path.relpath(file_path, start=source_dir)  # Only include the file name
                zipf.write(file_path, arcname)
    memory_file.seek(0)  # Reset the pointer to the beginning of the BytesIO object
    print(f"Configuration from '{source_dir}' zipped in memory.")
    return memory_file

def upload_to_solr(user, password, url, zip_file):
    """
    Upload a ZIP file to Solr Cloud using the API.

    :param user: Solr username.
    :param password: Solr password.
    :param url: Solr API URL for uploading the config.
    :param zip_file: A file-like object containing the ZIP file data.
    """
    headers = {"Content-Type": "application/octet-stream"}
    print(f"Uploading configset to {url}...")

    # Perform the PUT request with the in-memory ZIP file
    response = requests.put(url, headers=headers, data=zip_file, auth=(user, password), verify=True)
    if response.status_code == 200:
        print("Configset uploaded successfully!")
    else:
        print(f"Failed to upload configset: {response.status_code} - {response.text}")

def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Compress and upload a Solr configset to Solr Cloud.")
    parser.add_argument('--user', required=True, help="Solr username")
    parser.add_argument('--url', required=True, help="Solr cloud base URL (e.g., http://localhost:8983)")
    parser.add_argument('--config-name', required=True, help="Name of the configset")
    parser.add_argument('--source-dir', default='conf', help="Path to the directory to compress (default: 'conf')")
    args = parser.parse_args()


    # Prompt for the password securely
    password = getpass.getpass(prompt="Enter Solr password: ")

    # Create the ZIP file in memory
    print(f"Creating ZIP archive for configset '{args.config_name}' from directory '{args.source_dir}'...")
    zip_file = zip_configset_in_memory(args.source_dir, exclude_files=[".sh"])  # Exclude .sh files

    # Generate the configset api url from commandline options
    solr_url = f"{args.url}/api/configsets/{args.config_name}"
    # Upload the ZIP file to Solr Cloud
    upload_to_solr(args.user, password, solr_url, zip_file)

if __name__ == "__main__":
    main()
