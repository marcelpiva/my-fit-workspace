#!/bin/bash

# MyFit API Log Monitor
# Monitora logs HTTP e destaca erros
# Uso: ./api-logs.sh [filtro]
#   Filtros: all, errors, sql, http

LOG_FILE="/tmp/myfit-api.log"
FILTER="${1:-all}"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'
BOLD='\033[1m'
DIM='\033[2m'

show_help() {
    echo -e "${BOLD}${CYAN}MyFit API Log Monitor${NC}"
    echo ""
    echo -e "${BOLD}Uso:${NC} ./api-logs.sh [filtro]"
    echo ""
    echo -e "${BOLD}Filtros:${NC}"
    echo -e "  ${GREEN}all${NC}      - Todos os logs (padrão)"
    echo -e "  ${RED}errors${NC}   - Apenas erros (500, exceptions, DB errors)"
    echo -e "  ${YELLOW}http${NC}     - Apenas requisições HTTP"
    echo -e "  ${BLUE}sql${NC}      - Apenas queries SQL"
    echo ""
    exit 0
}

if [ "$FILTER" == "help" ] || [ "$FILTER" == "-h" ] || [ "$FILTER" == "--help" ]; then
    show_help
fi

echo -e "${BOLD}${CYAN}"
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                  MyFit API Log Monitor                           ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo -e "${DIM}Log: $LOG_FILE${NC}"
echo -e "${DIM}Filtro: ${BOLD}$FILTER${NC}"
echo -e "${DIM}Ctrl+C para sair${NC}"
echo ""
echo -e "${CYAN}────────────────────────────────────────────────────────────────────${NC}"

# Verificar se arquivo existe
if [ ! -f "$LOG_FILE" ]; then
    echo -e "${RED}Arquivo de log não encontrado: $LOG_FILE${NC}"
    echo -e "${YELLOW}Inicie a API com: /Users/marcelpiva/Projects/myfit/api-start.sh${NC}"
    exit 1
fi

tail -f "$LOG_FILE" 2>/dev/null | while read line; do

    # === ERRORS FILTER ===
    is_error=false
    error_type=""

    # DB Errors
    if echo "$line" | grep -qiE "sqlalchemy.*error|ProgrammingError|IntegrityError|OperationalError|UndefinedColumn|does not exist|asyncpg.*Error"; then
        is_error=true
        error_type="DB"
    # 500 Errors
    elif echo "$line" | grep -qE "\" 50[0-9] "; then
        is_error=true
        error_type="500"
    # Traceback / Exception
    elif echo "$line" | grep -qiE "^Traceback|Exception:|Error:|raise |File \".*\", line"; then
        is_error=true
        error_type="EXC"
    fi

    # === APPLY FILTER ===
    case "$FILTER" in
        errors)
            if [ "$is_error" = true ]; then
                case "$error_type" in
                    DB)  echo -e "${RED}${BOLD}[DB ERROR]${NC} ${RED}$line${NC}" ;;
                    500) echo -e "${RED}${BOLD}[500]${NC} ${RED}$line${NC}" ;;
                    EXC) echo -e "${MAGENTA}${BOLD}[EXCEPTION]${NC} ${MAGENTA}$line${NC}" ;;
                esac
            fi
            ;;

        sql)
            if echo "$line" | grep -qiE "sqlalchemy.*Engine.*SELECT|sqlalchemy.*Engine.*INSERT|sqlalchemy.*Engine.*UPDATE|sqlalchemy.*Engine.*DELETE"; then
                echo -e "${BLUE}[SQL]${NC} ${DIM}$(echo "$line" | sed 's/.*Engine //' | cut -c1-120)${NC}"
            fi
            ;;

        http)
            if echo "$line" | grep -qE "\" [0-9]{3} "; then
                STATUS=$(echo "$line" | grep -oE "\" [0-9]{3} " | tr -d '" ')
                if [ "$STATUS" -ge 500 ]; then
                    echo -e "${RED}[${STATUS}]${NC} $line"
                elif [ "$STATUS" -ge 400 ]; then
                    echo -e "${YELLOW}[${STATUS}]${NC} $line"
                else
                    echo -e "${GREEN}[${STATUS}]${NC} $line"
                fi
            fi
            ;;

        all|*)
            # Mostrar tudo com cores
            if [ "$is_error" = true ]; then
                case "$error_type" in
                    DB)  echo -e "${RED}${BOLD}[DB ERROR]${NC} ${RED}$line${NC}" ;;
                    500) echo -e "${RED}${BOLD}[500]${NC} ${RED}$line${NC}" ;;
                    EXC) echo -e "${MAGENTA}[EXCEPTION]${NC} $line" ;;
                esac
            elif echo "$line" | grep -qE "\" 4[0-9][0-9] "; then
                echo -e "${YELLOW}[4xx]${NC} ${DIM}$line${NC}"
            elif echo "$line" | grep -qE "\" 20[0-9] "; then
                echo -e "${GREEN}[OK]${NC} ${DIM}$line${NC}"
            elif echo "$line" | grep -qiE "Uvicorn running|Application startup"; then
                echo -e "${GREEN}${BOLD}[STARTUP]${NC} $line"
            else
                echo -e "${DIM}$line${NC}"
            fi
            ;;
    esac
done
