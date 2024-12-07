#!/usr/bin/env python3

"""
Process bank statements to calculate total contributions.

This module provides functions to handle CSV files containing data
about contributions made via PIX and fundraising platforms.
"""

import json
from datetime import datetime

import pandas as pd
import pytz


def process_pix_csv(file_path: str) -> float:
    """
    Calculate the total amount received via Pix from a .csv file.

    Args:
        file_path (str): Path to the CSV file containing bank statement data.

    Returns:
        float: The total amount received via PIX.
    """
    df = pd.read_csv(file_path, sep=',', encoding='utf-8')

    pix_labels = ['Pix - Recebido', 'Pix-Recebido QR Code']
    total_pix = 0

    filtered_data = df[df['Lançamento'].isin(pix_labels)]

    for _, row in filtered_data.iterrows():

        details = row['Detalhes']

        if pd.isna(details):
            continue

        total_pix += row['Valor']

    return total_pix


def process_vakinha_csv(file_path: str) -> float:
    """
    Calculate the total amount received via Vakinha from a .csv file.

    This function reads a CSV file from the fundraising platform Vakinha.
    It filters rows where the 'Status' column is 'Autorizado' and
    calculates the sum of the 'Valor Bruto' column.

    Args:
        file_path (str): Path to the CSV file containing the fundraising data.

    Returns:
        float: The total amount of authorized contributions.
    """
    df = pd.read_csv(file_path, sep=',', encoding='utf-8')

    total_vakinha = 0

    filtered_data = df[df['Status'] == 'Autorizado']

    for _, row in filtered_data.iterrows():
        total_vakinha += row['Valor Bruto']

    return total_vakinha


def main():
    """Generate a report of contributions from .csv data files."""
    timezone = pytz.timezone('America/Sao_Paulo')

    report = {
        'last_update': datetime.now(timezone).strftime('%d-%m-%Y, %H:%M'),
        'goal': 15_000,
    }

    report['vakinha'] = process_vakinha_csv('../data/vakinha.csv')
    report['pix'] = process_pix_csv('../data/pix.csv')

    with open('report.json', 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)


if __name__ == '__main__':
    main()
