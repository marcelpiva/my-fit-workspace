#!/bin/bash

# MyFit API Monitor
# Uso: ./api-monitor.sh [intervalo_segundos]

API_URL="http://localhost:3000"
INTERVAL=${1:-5}

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Endpoints para monitorar
ENDPOINTS=(
    "/api/v1/auth/me"
    "/api/v1/workouts/programs"
    "/api/v1/workouts/programs/catalog"
    "/api/v1/workouts/exercises"
    "/api/v1/marketplace/templates"
)

clear_screen() {
    printf "\033c"
}

get_status_color() {
    local code=$1
    if [[ $code -ge 200 && $code -lt 300 ]]; then
        echo -e "${GREEN}"
    elif [[ $code -ge 400 && $code -lt 500 ]]; then
        echo -e "${YELLOW}"
    elif [[ $code -ge 500 ]]; then
        echo -e "${RED}"
    else
        echo -e "${CYAN}"
    fi
}

get_status_icon() {
    local code=$1
    if [[ $code -ge 200 && $code -lt 300 ]]; then
        echo "✓"
    elif [[ $code == 401 ]]; then
        echo "🔒"
    elif [[ $code -ge 400 && $code -lt 500 ]]; then
        echo "⚠"
    elif [[ $code -ge 500 ]]; then
        echo "✗"
    elif [[ $code == "000" ]]; then
        echo "⊘"
    else
        echo "?"
    fi
}

monitor() {
    while true; do
        clear_screen

        echo -e "${BOLD}${CYAN}"
        echo "╔══════════════════════════════════════════════════════════════════╗"
        echo "║                    MyFit API Monitor                             ║"
        echo "╚══════════════════════════════════════════════════════════════════╝"
        echo -e "${NC}"

        echo -e "${BLUE}API:${NC} $API_URL"
        echo -e "${BLUE}Atualizado:${NC} $(date '+%Y-%m-%d %H:%M:%S')"
        echo -e "${BLUE}Intervalo:${NC} ${INTERVAL}s"
        echo ""

        # Health check
        echo -e "${BOLD}Health Check${NC}"
        echo "────────────────────────────────────────────────────────────────────"

        START=$(date +%s%N)
        HEALTH_RESP=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 2 "$API_URL/docs" 2>/dev/null)
        END=$(date +%s%N)
        LATENCY=$(( (END - START) / 1000000 ))

        if [[ $HEALTH_RESP == "200" ]]; then
            echo -e "  ${GREEN}✓ API Online${NC} (${LATENCY}ms)"
        elif [[ $HEALTH_RESP == "000" ]]; then
            echo -e "  ${RED}✗ API Offline${NC} - Conexão recusada"
        else
            echo -e "  ${YELLOW}⚠ API Respondendo${NC} (HTTP $HEALTH_RESP, ${LATENCY}ms)"
        fi
        echo ""

        # Endpoints
        echo -e "${BOLD}Endpoints${NC}"
        echo "────────────────────────────────────────────────────────────────────"
        printf "  %-40s %6s %8s %s\n" "ENDPOINT" "STATUS" "TEMPO" ""
        echo "  ──────────────────────────────────────────────────────────────────"

        for endpoint in "${ENDPOINTS[@]}"; do
            START=$(date +%s%N)
            RESP=$(curl -s -o /tmp/api_resp.json -w "%{http_code}" --connect-timeout 3 "$API_URL$endpoint" 2>/dev/null)
            END=$(date +%s%N)
            LATENCY=$(( (END - START) / 1000000 ))

            COLOR=$(get_status_color $RESP)
            ICON=$(get_status_icon $RESP)

            # Extrair mensagem de erro se houver
            ERROR_MSG=""
            if [[ $RESP -ge 400 ]]; then
                ERROR_MSG=$(cat /tmp/api_resp.json 2>/dev/null | grep -o '"detail":"[^"]*"' | cut -d'"' -f4 | head -1)
                if [[ -n $ERROR_MSG ]]; then
                    ERROR_MSG=" ($ERROR_MSG)"
                fi
            fi

            printf "  ${COLOR}$ICON${NC} %-38s ${COLOR}%3s${NC} %6dms${YELLOW}%s${NC}\n" "$endpoint" "$RESP" "$LATENCY" "$ERROR_MSG"
        done

        echo ""
        echo "────────────────────────────────────────────────────────────────────"
        echo -e "${CYAN}Legenda:${NC} ${GREEN}✓${NC} OK  ${YELLOW}🔒${NC} Auth Required  ${YELLOW}⚠${NC} Client Error  ${RED}✗${NC} Server Error  ⊘ Offline"
        echo ""
        echo -e "Pressione ${BOLD}Ctrl+C${NC} para sair"

        sleep $INTERVAL
    done
}

# Verificar se curl está disponível
if ! command -v curl &> /dev/null; then
    echo "Erro: curl não encontrado"
    exit 1
fi

monitor
